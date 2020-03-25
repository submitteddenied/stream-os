import React, {Component} from 'react'

import * as THREE from 'three'

class ThreeDeeCanvas extends Component {
  constructor() {
    super()
    this.canvas = React.createRef()
  }

  componentDidMount() {
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 )
    this.camera.position.z = 1
 
    this.scene = new THREE.Scene()

    //Call all child components to add their stuff to the scene
    this.props.characters.forEach((child) => {
      child.mount(this.scene)
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
      child.animate(this.scene)
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
