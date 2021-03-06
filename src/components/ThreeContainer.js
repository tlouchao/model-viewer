import React, { useRef, useState, useEffect, useMemo } from "react"
import * as THREE from "three"
import { categoryTypes, threeClasses } from "./helpers"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter.js'
import { THREE_SCENE_COLOR, 
         ACTOR_COLORS,
         MSG_ADD,
         MSG_DELETE,
         MSG_UPDATE,
         MSG_VISIBLE,
         MSG_EXPORT,
         MSG_RESET,
       } from "constants/constants"

const ThreeContainer = (props) => {

    /*------------------------------------------------------------------------------------------*/

    const ctrl1 = "Scroll to ZOOM."
    const ctrl2 = "Drag to ROTATE."

    /*------------------------------------------------------------------------------------------*/
    
    const stdMaterialMap = useMemo(() => Object.fromEntries(ACTOR_COLORS.map(c => // standard materials are shared
                                      [c, new THREE.MeshStandardMaterial({color: c})])), [])
    const wireMaterialMap = useMemo(() => Object.fromEntries(ACTOR_COLORS.map(c => // wire materials are shared
                                      [c, new THREE.MeshBasicMaterial({color: c, wireframe: true})])), [])

    const geometryMap = useMemo(() => new Object(), []) // unique geometry per mesh
    const boundsMap = useMemo(() => new Object(), []) // light bounding box helpers
    const object3DMap = useMemo(() => Object.fromEntries(categoryTypes.map(x => [x, new Object()])), [])

    const scene = useMemo(() => new THREE.Scene(), [])
    const camera = useMemo(() => new THREE.PerspectiveCamera( 75, 1, 0.1, 1000), [])
    const renderer = useMemo(() => new THREE.WebGLRenderer(), [])
    const composer = useMemo(() => new EffectComposer(renderer), [])
    const controls = useMemo(() => new OrbitControls(camera, renderer.domElement), [])

    const light = useMemo(() => new THREE.HemisphereLight(0xFFFFFF, 0x404040, 1), [])
    const grid = useMemo(() =>new THREE.GridHelper ( 20, 20, 0x444444, 0x444444 ), [])
    const axes = useMemo(() => new THREE.AxesHelper( 1000 ), [])

    const [zoomText, setZoomText] = useState(ctrl1)
    const [rotateText, setRotateText] = useState(ctrl2)

    const exporter = useMemo(() => new OBJExporter(), [])
    const ref = useRef(null)

    /*------------------------------------------------------------------------------------------*/
    
    // setup DOM elem reliant properties after mount
    useEffect(() => {

        const [w, h] = [ref.current.clientWidth, ref.current.clientHeight]

        // setup scene
        scene.background = new THREE.Color(THREE_SCENE_COLOR)
        scene.add(light)
        scene.add(grid)
        scene.add(axes)

        // setup camera
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        camera.position.set(-1.5, 1.5, 3)
        camera.lookAt(0, 0, 0)

        // setup controls
        controls.enableZoom = true
        controls.enablePan = false
        controls.maxDistance = 50

        // append canvas element to DOM
        renderer.setSize(w, h)
        ref.current.appendChild(renderer.domElement)

        composer.setSize(w, h)

        const renderPass = new RenderPass(scene, camera)
        composer.addPass(renderPass)
        
        const outlinePass = new OutlinePass(new THREE.Vector2(w, h), scene, camera)
		composer.addPass(outlinePass)
        
        animate()

        // window resize listener
        window.addEventListener('resize', handleResize)
        
        // if unmount
        return () => {

            console.log("unmounting THREE.js container")
            console.log(renderer.info)

            // remove object3Ds from scene
            Object.keys(object3DMap).forEach(categoryType =>
                Object.keys(object3DMap[categoryType]).forEach(id => 
                    removeWrapper(object3DMap[categoryType], id)
                )
            )
            Object.keys(boundsMap).forEach(id => 
                removeWrapper(boundsMap, id)
            )

            // dispose geometry and materials
            Object.keys(geometryMap).forEach(g => disposeWrapper(geometryMap, g))
            Object.keys(stdMaterialMap).forEach(m => disposeWrapper(stdMaterialMap, m))
            Object.keys(wireMaterialMap).forEach(m => disposeWrapper(wireMaterialMap, m))

            // remove canvas element
            if (ref && ref.current){
                while (ref.current.firstElementChild) {
                    ref.current.firstElementChild.remove()
                }
            }

            window.removeEventListener('resize', handleResize)

            console.log("dispose geometry and materials")
            console.log(renderer.info)

        }
    }, [])

    // handle messages sent by user input
    useEffect(() => {
        if (props.msg){
            const [m, id] = props.msg
            switch(m){

                case MSG_ADD:
                    addHelper(id)
                    break

                case MSG_DELETE:
                    deleteHelper(id)
                    break

                case MSG_UPDATE:
                    deleteHelper(id)
                    addHelper(id)
                    break

                case MSG_VISIBLE:
                    visibilityHelper()
                    break

                case MSG_RESET:
                    camera.position.set(-1.5, 1.5, 3)
                    camera.lookAt(0, 0, 0)
                    break

                case MSG_EXPORT:
                    const parsed = exporter.parse(scene)
                    const blob = new Blob([parsed], {type: "text/plain"})
                    const link = document.createElement('a')
                    link.setAttribute('target', '_self')
                    link.setAttribute('href', URL.createObjectURL(blob))
                    link.setAttribute('download', "scene.obj")
                    document.body.appendChild(link)
                    link.click()
                    link.remove()
                    break

                default:
                    console.warn(`message "${m}" not implemented`)
                    break
            }
        }
    }, [props.msg])

    // show outline based on selection state
    useEffect(() => {
        let selectedObjectsArr = []
        const cs = props.categoriesSelected
        if (Object.keys(cs).every(k => cs[k] == false)) {
            const flattened = Object.keys(props.actors).reduce((acc, x) => 
                acc.concat(Object.keys(props.actors[x]).map(y => [y, props.actors[x][y]])), [])
            const mesh = flattened.find(x => x[1].isSelected)
            if (mesh){
                const categoryType = mesh[1].categoryType + 's'
                const id = mesh[0]
                selectedObjectsArr.push(object3DMap[categoryType][id])        
            } 
        }
        composer.passes[1].selectedObjects = selectedObjectsArr
    }, [props.actors])

    // change visibility based on props
    useEffect(() => {
        Object.keys(boundsMap).forEach(id => boundsMap[id].visible = props.toggleOptions.get("bounds"))
        grid.visible = props.toggleOptions.get("grid")
        axes.visible = props.toggleOptions.get("axes")
        setZoomText((props.toggleOptions.get("controls")) ? ctrl1 : "")
        setRotateText((props.toggleOptions.get("controls")) ? ctrl2 : "")
    }, [props.toggleOptions])

    /*------------------------------------------------------------------------------------------*/

    /* animate */

    function animate() {
        requestAnimationFrame(animate)
        controls.update()
		composer.render()
    }

    /*------------------------------------------------------------------------------------------*/

    /* helpers */

    function disposeWrapper(obj, key){
        obj[key].dispose() // free geometry/material
        delete obj[key] // remove ref
    }

    function removeWrapper(obj, key){
        scene.remove(obj[key]) // remove from scene
        delete obj[key] // remove ref
    }

    function matrixHelper(object3D, mat){
        object3D.scale.set(...Object.values(mat.scale))
        object3D.position.set(...Object.values(mat.translate))
        object3D.rotation.set(...(Object.values(mat.rotate)
            .map(r => THREE.MathUtils.degToRad(r))))
    }

    const addHelper = (id) => {
        // get category type
        let categoryType
        Object.keys(props.actors).forEach(c => 
            { if(id in props.actors[c]){categoryType = c}})
        if (!categoryType){
            throw new Error(`actor with id ${id} not found`)
        }

        // construct Three.js object3D instance
        const actor = props.actors[categoryType][id]
        const mat = actor.matrix

        let geo
        let object3D
        if (categoryType === "primitives"){
            geo = new threeClasses[categoryType][actor.actorType]
                (...Object.values(actor.attributes).map(v => v.data))
            geometryMap[id] = geo

            // create standard material if does not exist
            if (!(actor.color in stdMaterialMap)){
                stdMaterialMap[actor.color] = 
                    new THREE.MeshStandardMaterial({color: actor.color})
            }

            const mesh = new THREE.Mesh(geo, stdMaterialMap[actor.color])
            object3D = mesh
        }
        if (categoryType === "lights"){
            object3D = new threeClasses[categoryType][actor.actorType]
                (actor.color, ...Object.values(actor.attributes).map(v => v.data))

            // bounding box helper
            geo = new THREE.SphereGeometry(1, 4, 2)
            geometryMap[id] = geo

            // create wire material if does not exist
            if (!(actor.color in wireMaterialMap)){
                wireMaterialMap[actor.color] = 
                    new THREE.MeshBasicMaterial({color: actor.color, wireframe: true})
            }

            const bounds = new THREE.Mesh(geo, wireMaterialMap[actor.color])

            // set coords
            matrixHelper(bounds, mat)

            // keep ID reference
            boundsMap[id] = bounds
            scene.add(bounds)
        }

        // set coords
        matrixHelper(object3D, mat)

        // keep ID reference
        object3DMap[categoryType][id] = object3D
        object3D.visible = actor.isVisible
        scene.add(object3D)
    }

    const visibilityHelper = () => {
        Object.keys(object3DMap).forEach(categoryType => 
            Object.keys(object3DMap[categoryType]).forEach(id => {
                object3DMap[categoryType][id].visible = 
                    props.actors[categoryType][id].isVisible
            }))
    }

    const deleteHelper = (id) => {
        // get types
        let categoryType
        Object.keys(object3DMap).forEach(c => 
            { if(id in object3DMap[c]){
                categoryType = c
            }}
        )
        if (!categoryType){
            throw new Error(`object3D with id ${id} not found`)
        }

        removeWrapper(object3DMap[categoryType], id)

        // dispose unique geometry, keep material
        disposeWrapper(geometryMap, id)

        if (categoryType === "lights") {
            removeWrapper(boundsMap, id)
        }

        console.log(renderer.info)
    }

    /*------------------------------------------------------------------------------------------*/

    // event listeners 
    const handleResize = () => {
        if (ref && ref.current && camera) {
            const canvas = ref.current.firstElementChild
            const w = ref.current.clientWidth
            const h = ref.current.clientHeight
            canvas.style.width = w.toString() + 'px'
            canvas.style.height = h.toString() + 'px'
            canvas.width = w
            canvas.height = h
            camera.aspect = w / h
            camera.updateProjectionMatrix()
            renderer.setSize(w, h)
            composer.setSize(w, h)
        }
    }

    /*------------------------------------------------------------------------------------------*/

    // JSX
    return (
        <div id="three-container"
             tabIndex="0"
             onBlur={props.handleGUIBlur}>
            <div id="three-controls">
                <p>{zoomText}</p>
                <p>{rotateText}</p>
            </div>
            <div id="three-canvas"  
                 ref={ref} 
            />
        </div>
    )
}

export default ThreeContainer