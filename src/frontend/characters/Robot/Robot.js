import * as THREE from 'three'
import GLTFLoader from '../../3rdparty/GLTFLoader.js'
import RobotModel from './RobotExpressive.glb'

const NON_LOOPED_ANIMATIONS = [
  'Death', 'Sitting', 'Standing', //States
  'Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp' //gestures
]

class Robot {
  constructor() {
    const loader = new GLTFLoader()
    this.modelPromise = new Promise((res, rej) => {
      loader.load(RobotModel, (gltf) => {
        res(gltf)
      }, undefined, (e) => {
        console.error(e)
      })
    })

    this.modelPromise.then((gltf) => {
      this.model = gltf.scene
      this.model.children[0].position.y = -8
      this.model.children[0].rotation.y = 0
      this.mixer = new THREE.AnimationMixer( this.model )
      this.actions = {}
      gltf.animations.forEach((animation) => {
        const action = this.mixer.clipAction(animation)

        this.actions[animation.name] = action
        if(NON_LOOPED_ANIMATIONS.indexOf(animation.name) >= 0) {
          action.clampWhenFinished = true
          action.loop = THREE.LoopOnce
        }
      })

      this.actions['Walking'].play()
    })  
  }

  mount(scene, clock) {
    this.modelPromise.then((gltf) => {
      scene.add(gltf.scene.children[0])
    })
  }

  animate(scene, clock) {
    const dt = clock.getDelta()

    if ( this.mixer ) this.mixer.update( dt )
  }
}

export default Robot