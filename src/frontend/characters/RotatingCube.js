import * as THREE from 'three'

class RotatingCube {
  constructor() {

  }

  mount(scene) {
    this.geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 )
    this.material = new THREE.MeshNormalMaterial()
 
    this.mesh = new THREE.Mesh( this.geometry, this.material )
    scene.add( this.mesh )
  }

  animate(scene) {
    this.mesh.rotation.x += 0.01
    this.mesh.rotation.y += 0.02
  }
}

export default RotatingCube