import React, { useRef, useEffect, useMemo } from "react"
import * as THREE from "three";
import { categoryMapHelper, threeClasses } from "./helpers";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { THREE_SCENE_COLOR, 
         ACTOR_COLORS,
         MSG_ADD,
         MSG_DELETE,
         MSG_UPDATE,
         MSG_RESET,
       } from "./../constants/constants"

const ThreeContainer = (props) => {

    /*------------------------------------------------------------------------------------------*/
    
    const actorMap = useMemo(() => categoryMapHelper({}), [])
    const materialMap = useMemo(() => Object.fromEntries(ACTOR_COLORS.map(c => 
                                      [c, new THREE.MeshStandardMaterial({color: c})])), [])
    
    const scene = useMemo(() => new THREE.Scene(), [])
    const renderer = useMemo(() => new THREE.WebGLRenderer(), [])
    const camera = useMemo(() => new THREE.PerspectiveCamera( 75, 1, 0.1, 1000), [])
    const controls = useMemo(() => new OrbitControls(camera, renderer.domElement), [])
    const light = useMemo(() => new THREE.HemisphereLight(0xFFFFFF, 0x404040, 1), [])
    const grid = useMemo(() =>new THREE.GridHelper ( 20, 20, 0x444444, 0x444444 ), [])
    const axes = useMemo(() => new THREE.AxesHelper( 1000 ), [])

    const ref = useRef(null)

    /*------------------------------------------------------------------------------------------*/
    
    // setup DOM elem reliant properties after mount
    useEffect(() => {

        // setup scene
        scene.background = new THREE.Color(THREE_SCENE_COLOR)
        scene.add(light)
        scene.add(grid)
        scene.add(axes)

        // setup camera
        camera.aspect = ref.current.clientWidth/ref.current.clientHeight
        camera.updateProjectionMatrix()
        camera.position.set(-1.5, 1.5, 3)
        camera.lookAt(0, 0, 0)

        // setup controls
        controls.enableZoom = true
        controls.enablePan = false
        controls.maxDistance = 50

        // append canvas element to DOM
        renderer.setSize(ref.current.clientWidth, 
            ref.current.clientHeight)
        ref.current.appendChild(renderer.domElement)
        
        // anim loop
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera)
        })

        // window resize listener
        window.addEventListener('resize', handleResize)
        
        // if unmount
        return () => {

            console.log("unmounting THREE.js container")
            console.log(renderer.info)

            Object.keys(materialMap).forEach(m => materialMap[m].dispose())
            Object.keys(actorMap["primitives"]).forEach(g => actorMap["primitives"][g].dispose())

            if (ref && ref.current){
                while (ref.current.firstElementChild) {
                    ref.current.firstElementChild.remove()
                }
            }

            window.removeEventListener('resize', handleResize)

        }
    }, [])

    // handle messages sent by user input
    useEffect(() => {
        if (props.msg){
            const m = props.msg[0]
            const id = props.msg[1]
            switch(m){
                case MSG_ADD:
                    let category
                    Object.keys(props.actors).forEach(x => 
                        { if(id in props.actors[x]){ category = x }})
                    if (!category){
                        throw new Error(`actor with id ${id} not found`)
                    }
                    const actor = props.actors[category][id]
                    let object3D = new threeClasses[actor.categoryType + 's'][actor.actorType](...Object.values(actor.attributes))
                    if (actor.categoryType === "primitive"){
                        let tmp = new THREE.Mesh(object3D, materialMap[actor.color])
                        object3D = tmp
                    }
                    object3D.position.set(...Object.values(actor.matrix.translate))
                    object3D.rotation.set(...Object.values(actor.matrix.rotate))
                    object3D.scale.set(...Object.values(actor.matrix.scale))
                    object3D.userData.id = id
                    actorMap[id] = object3D
                    scene.add(object3D)
                    break
                case MSG_RESET:
                    camera.position.set(-1.5, 1.5, 3)
                    camera.lookAt(0, 0, 0)
                    break
                default:
                    console.warn(`message "${m}" not implemented`)
                    break
            }
        }
    }, [props.msg])

    // change visibility based on props
    useEffect(() => {
        grid.visible = props.toggleOptions.get("grid")
        axes.visible = props.toggleOptions.get("axes")
    }, [props.toggleOptions])

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
        }
    }

    /*------------------------------------------------------------------------------------------*/

    // JSX
    return (
        <div id="three-canvas" 
            tabIndex="0" 
            onBlur={props.handleGUIBlur} 
            ref={ref}>
        </div>
    )
}

export default ThreeContainer