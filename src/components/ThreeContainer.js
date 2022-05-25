import React, { useRef, useState, useEffect, useMemo } from "react"
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { THREE_SCENE_COLOR, ACTOR_COLORS } from "./../constants/constants"

const ThreeContainer = (props) => {

    /*------------------------------------------------------------------------------------------*/
    
    const [geometry, setGeometry] = useState([new THREE.BoxGeometry(1,1,1), 
                                              new THREE.CylinderGeometry(.75, .75, 1.5, 16), 
                                              new THREE.TorusGeometry(.75, .375, 12, 24)]
                                              [Math.floor(Math.random() * 3)])
    const [material, setMaterial] = useState(new THREE.MeshStandardMaterial(
                                        {color: ACTOR_COLORS[Math.floor(Math.random() * ACTOR_COLORS.length)], 
                                        wireframe: props.showWireframe})
                                    )
    
    let camera
    let controls
    const renderer = useMemo(() => new THREE.WebGLRenderer(), [])
    const scene = useMemo(() => new THREE.Scene(), [])
    const light = useMemo(() => new THREE.HemisphereLight(0xFFFFFF, 0x404040, 1), [])
    const grid = useMemo(() =>new THREE.GridHelper ( 20, 20, 0x444444, 0x444444 ), [])
    const axes = useMemo(() => new THREE.AxesHelper( 1000 ), [])
    const ref = useRef(null)

    /*------------------------------------------------------------------------------------------*/
    
    useEffect(() => {
        // set up scene objects dependent on width and height
        const mesh = new THREE.Mesh(geometry, material)
        camera = new THREE.PerspectiveCamera( 75, 
                 ref.current.clientWidth/ref.current.clientHeight,
                 0.1, 
                 1000)
        // setup camera
        camera.position.set(-1.5, 1.5, 3)
        camera.lookAt(0, 0, 0)

        // scene setup
        scene.background = new THREE.Color(THREE_SCENE_COLOR)
        scene.add(light)
        scene.add(grid)
        scene.add(axes)
        scene.add(mesh)

        // setup controls
        controls = new OrbitControls(camera, renderer.domElement)
        controls.enableZoom = true
        controls.enablePan = false
        controls.maxDistance = 50

        // append canvas element to DOM
        renderer.setSize(ref.current.clientWidth, 
            ref.current.clientHeight)
        ref.current.appendChild(renderer.domElement)

        console.log("render")
        console.log(renderer.info)
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera)
        })
                    
        // window resize listener
        window.addEventListener('resize', handleResize)
        
        return () => {
            camera = null
            controls = null
            light = null
            grid = null
            axes = null
            scene = null
            geometry.forEach(x => x.dispose())
            material.dispose()
            if (ref && ref.current){
                while (ref.current.firstElementChild) {
                    ref.current.firstElementChild.remove()
                }
            }
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
          grid.visible = props.showGrid    
          axes.visible = props.showAxes;
        material.wireframe = props.showWireframe;
    }, [props.showGrid, props.showAxes, props.showWireframe])

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

    return (
        <div id="three-canvas" 
            tabIndex="0" 
            onBlur={props.handleGUIBlur} 
            ref={ref}>
        </div>
    )
}

export default ThreeContainer