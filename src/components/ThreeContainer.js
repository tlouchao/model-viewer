import React from "react"
import * as THREE from "three";
import { THREE_BGCOLOR } from "./../constants/constants"

class ThreeContainer extends React.Component {
    constructor(props){
        super(props)
        this.ref = React.createRef()
        this.animate = this.animate.bind(this)
        this.handleResize = this.handleResize.bind(this)
        this.state = {
            geometry: new THREE.BoxGeometry( 1, 1, 1 ),
            material: new THREE.MeshBasicMaterial( { color: 0x00ff00 } ),
            scene: new THREE.Scene(),
            renderer: new THREE.WebGLRenderer(),
            camera: null,
            cube: null,
            frameId: null,
            width: null,
            height: null
        }
    }
    componentDidMount() {
        this.setState({width: this.ref.current.clientWidth,
                       height: window.innerHeight,
                       camera: new THREE.PerspectiveCamera( 75, 
                            this.ref.current.clientWidth/window.innerHeight, 
                            0.1, 
                            1000 ),
                       cube: new THREE.Mesh(this.state.geometry, this.state.material)},
                      () => {
                        this.state.scene.background = new THREE.Color(THREE_BGCOLOR)
                        this.state.scene.add(this.state.cube)
                        this.state.renderer.setSize( this.state.width, this.state.height)
                        this.ref.current.appendChild( this.state.renderer.domElement )
                        this.state.camera.position.z = 3
                        this.animate()
                    })
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.state.frameId);
        while (this.ref.current.lastChild) {
            this.ref.current.removeChild(this.ref.current.lastChild)
        }
        window.removeEventListener('resize', this.handleResize)
    }

    animate() {
        this.state.frameId = requestAnimationFrame( this.animate );
        //this.state.cube.rotation.x += 0.01;
        //this.state.cube.rotation.y += 0.01;
        this.state.renderer.render( this.state.scene, this.state.camera );
    };

    handleResize() {
        this.setState({width: this.ref.current.clientWidth,
                       height: window.innerHeight},
                     () => {
                        this.state.renderer.setSize(this.state.width, this.state.height)  
                        this.state.camera.aspect = this.state.width / this.state.height;
                        this.state.camera.updateProjectionMatrix()       
                     })
    }

    render() {
        return (
            <div id="three-canvas" ref={this.ref} />
        )
    }
}

export default ThreeContainer