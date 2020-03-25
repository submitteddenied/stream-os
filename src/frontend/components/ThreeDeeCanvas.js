import React, {Component} from 'react'

import * as THREE from 'three'

class ThreeDeeCanvas extends Component {
  constructor() {
    super()
    this.canvas = React.createRef()
  }

  componentDidMount() {
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 50 )
    this.camera.position.z = 12
    this.camera.position.y = 0
    this.camera.lookAt.y = 8
 
    this.scene = new THREE.Scene()
    this.clock = new THREE.Clock()
    this.light = new THREE.DirectionalLight( 0xffffff )
    this.light.position.set( 0, 20, 10 )
    this.scene.add( this.light )

    this.hemilight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    this.hemilight.position.set( 0, 20, 0 );
    this.scene.add( this.hemilight );

    //Call all child components to add their stuff to the scene
    this.props.characters.forEach((child) => {
      child.mount(this.scene, this.clock)
    })
 
    this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } )
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    
    this.canvas.current.appendChild( this.renderer.domElement )

    this.animate()
  }

  animate() {
    requestAnimationFrame(() => this.animate() )
 
    //Call all child components to render/update
    this.props.characters.forEach((child) => {
      child.animate(this.scene, this.clock)
    })

    this.renderer.render( this.scene, this.camera )
  }

  render() {
    return (
      <div className="canvas3d" ref={this.canvas}>
      </div>
    )
  }
}

export default ThreeDeeCanvas
