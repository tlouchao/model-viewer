import React, { useRef, useEffect, useMemo } from "react"
import * as THREE from "three";
import { categoryMapHelper } from "./helpers";
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
    
    const actorMap = useMemo(() => categoryMapHelper({}), [props.msg])
    const materialMap = useMemo(() => Object.fromEntries(ACTOR_COLORS.map(c => 
        [c, new THREE.MeshStandardMaterial({color: c})])), [])
    
    const ref = useRef(null)
    const camera = useMemo(() => new THREE.PerspectiveCamera( 75, 1, 0.1, 2000), [])
    const renderer = useMemo(() => new THREE.WebGLRenderer(), [])
    const scene = useMemo(() => new THREE.Scene(), [])
    const light = useMemo(() => new THREE.HemisphereLight(0xFFFFFF, 0x404040, 1), [])
    const grid = useMemo(() =>new THREE.GridHelper ( 20, 20, 0x444444, 0x444444 ), [])
    const axes = useMemo(() => new THREE.AxesHelper( 1000 ), [])

    /*------------------------------------------------------------------------------------------*/
    
    // setup after mount
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
        const controls = new OrbitControls(camera, renderer.domElement)
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
            camera = null
            light = null
            grid = null
            axes = null
            scene = null
            Object.keys(materialMap).forEach(m => materialMap[m].dispose())
            Object.keys(actorMap["primitives"]).forEach(g => actorMap["primitives"][g].dispose())
            actorMap["lights"] = null

            console.log(renderer.info)
            renderer = null

            if (ref && ref.current){
                while (ref.current.firstElementChild) {
                    ref.current.firstElementChild.remove()
                }
            }

            window.removeEventListener('resize', handleResize)

        }
    }, [])

    useEffect(() => {
        if (props.msg){
            switch(Object.keys(props.msg)[0]){
                case MSG_RESET:
                    if (camera){
                        camera.position.set(-1.5, 1.5, 3) // mutate state directly
                        camera.lookAt(0, 0, 0) // mutate state directly
                    }
                    break
                default:
                    console.warn("msg not implemented")
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