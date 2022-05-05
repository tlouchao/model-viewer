import React from "react"
import * as THREE from "three";

class App extends React.Component {
    constructor(props){
        super(props)
        this.animate = this.animate.bind(this)
        this.state = {
            camera: new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ),
            geometry: new THREE.BoxGeometry( 1, 1, 1 ),
            material: new THREE.MeshBasicMaterial( { color: 0x00ff00 } ),
            scene: new THREE.Scene(),
            renderer: new THREE.WebGLRenderer(),
            cube: null,
            frameId: null
        }
    }
    componentDidMount() {
        this.setState({cube: new THREE.Mesh(this.state.geometry, this.state.material)},
                      () => {
                        this.state.scene.add(this.state.cube);
                        this.state.renderer.setSize( window.innerWidth, window.innerHeight );
                        this.mount.appendChild( this.state.renderer.domElement );
                        this.state.camera.position.z = 3;
                        this.animate();
                    });
    }

    animate() {
        this.state.frameId = requestAnimationFrame( this.animate );
        this.state.cube.rotation.x += 0.01;
        this.state.cube.rotation.y += 0.01;
        this.state.renderer.render( this.state.scene, this.state.camera );
    };

    componentWillUnmount() {
        cancelAnimationFrame(this.state.frameId);
        this.mount.removeChild( this.state.renderer.domElement );
    }

    render() {
        return (
            <div id="app" ref={ref => (this.mount = ref)} />
        )
    }
}

export default App