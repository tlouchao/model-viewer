import React from "react"
import * as THREE from "three";
import { THREE_SCENE_COLOR } from "./../constants/constants"

class ThreeContainer extends React.Component {
    constructor(props){
        super(props)
        this.ref = null
        this.animate = this.animate.bind(this)
        this.handleResize = this.handleResize.bind(this)
        this.setCanvasRef = this.setCanvasRef.bind(this)
        this.state = {
            geometry: new THREE.BoxGeometry( 1, 1, 1 ),
            material: new THREE.MeshStandardMaterial( { color: 0x0000ff } ),
            renderer: new THREE.WebGLRenderer(),
            scene: new THREE.Scene(),
            light: new THREE.HemisphereLight(0xFFFFFF, 0x404040, 1),
            grid: new THREE.GridHelper ( 20, 20, 0x444444, 0x444444 ),
            axes: new THREE.AxesHelper( 50 ),
            camera: null,
            cube: null,
            frameId: null,
            width: null,
            height: null
        }
    }
    componentDidMount() {
        if (this.ref){
            this.setState({width: this.ref.clientWidth,
                        height: window.innerHeight,
                        camera: new THREE.PerspectiveCamera( 75, 
                                this.ref.clientWidth/window.innerHeight,
                                0.1, 
                                1000 ),
                        cube: new THREE.Mesh(this.state.geometry, this.state.material)},
                        () => {
                            this.state.scene.background = new THREE.Color(THREE_SCENE_COLOR)
                            this.state.scene.add(this.state.light)
                            this.state.scene.add(this.state.grid)
                            this.state.scene.add(this.state.axes)
                            this.state.scene.add(this.state.cube)
                            this.state.renderer.setSize( this.state.width, this.state.height)
                            this.ref.appendChild( this.state.renderer.domElement )
                            this.state.camera.position.set (-1.5, 1.5, 3)
                            this.state.camera.lookAt(0, 0, 0)   
                            this.animate()
                        })
        }
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.showGrid !== prevProps.showGrid) {
          this.state.grid.visible = this.props.showGrid
        }
        if (this.props.showAxes !== prevProps.showAxes) {
            this.state.axes.visible = this.props.showAxes;
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.state.frameId);
        if (this.ref){
            while (this.ref.lastChild) {
                this.ref.removeChild(this.ref.lastChild)
            }
        }
        window.removeEventListener('resize', this.handleResize)
    }

    animate() {
        this.state.frameId = requestAnimationFrame( this.animate );
        // this.state.cube.rotation.x += 0.01;
        // this.state.cube.rotation.y += 0.01;
        this.state.renderer.render( this.state.scene, this.state.camera );
    };

    handleResize() {
        if (this.ref) {
            this.setState({width: this.ref.clientWidth,
                height: window.innerHeight},
                () => {
                    this.state.renderer.setSize(this.state.width, this.state.height)  
                    this.state.camera.aspect = this.state.width / this.state.height;
                    this.state.camera.updateProjectionMatrix()
                })
        }
    }

    setCanvasRef = element => {
      this.ref = element;
    };

    render() {
        return (
            <div id="three-canvas" ref={this.setCanvasRef} />
        )
    }
}

export default ThreeContainer