import React, { Component } from 'react';
import * as THREE from 'three';
// import WEBGL from "w"


const MAXPOINTS = 500

class ThreeScene extends Component{

    // Run on mount
    componentDidMount(){
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight
        //ADD SCENE
        this.scene = new THREE.Scene()
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        )
        // this.camera.position.z = 4
        this.camera.position.set(0,0,100)
        this.camera.lookAt(0,0,0)
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('#000000')
        this.renderer.setSize(width, height)

        // Add renderer to DOM
        this.mount.appendChild(this.renderer.domElement)

        //ADD CUBE
        // const geometry = new THREE.BoxGeometry(1, 1, 1)
        // const material = new THREE.MeshBasicMaterial({ color: '#433F81'})
        // this.cube = new THREE.Mesh(geometry, material)
        // this.scene.add(this.cube)


        // Add Line
        // const line_material = new THREE.LineBasicMaterial({color: "#ffffff" })
        // const line_geo = new THREE.Geometry()
        // line_geo.vertices.push(new THREE.Vector3(-10, 0, 0))
        // line_geo.vertices.push(new THREE.Vector3(0, 10, 0))
        // line_geo.vertices.push(new THREE.Vector3(10, 0, 0))



        // this.line = new THREE.Line(line_geo, line_material)

        // this.scene.add(this.line)



        // Geometry
        const geometry = new THREE.BufferGeometry()


        // attributes
        const positions = new Float32Array( MAXPOINTS * 3 ); // 3 vertices per point
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

        // draw range
        this.drawCount = 2; // draw the first 2 points, only
        geometry.setDrawRange( 0, this.drawCount );

        // material
        const material = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 2 } );

        // line
        this.line = new THREE.Line( geometry,  material );
        this.scene.add( this.line );




        this.start()
    }

    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    animate = () => {

        // this.line.rotation.y += 0.01
        // this.line.rotation.x += 0.01

        let positions = this.line.geometry.attributes.position.array;

        let x, y, z, index;
        x = y = z = index = 0;

        for ( let i = 0, l = MAXPOINTS; i < l; i ++ ) {

            positions[ index ++ ] = x;
            positions[ index ++ ] = y;
            positions[ index ++ ] = z;

            x += ( Math.random() - 0.5 ) * 30;
            y += ( Math.random() - 0.5 ) * 30;
            z += ( Math.random() - 0.5 ) * 30;

        }
        this.drawCount ++
        this.line.geometry.setDrawRange( 0, this.drawCount );

        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)

    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }

    render(){


        return(
            <div
                style={{ width: '100%', height: '100vh' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}

export default ThreeScene