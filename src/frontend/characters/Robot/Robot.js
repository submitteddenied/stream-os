import * as THREE from 'three'
import GLTFLoader from '../../3rdparty/GLTFLoader.js'
import RobotModel from './RobotExpressive.glb'

import {IdleState} from './states'

const NON_LOOPED_ANIMATIONS = [
  'Death', 'Sitting', 'Standing', //States
  'Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp' //gestures
]

//states [ 'Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing' ];
//emotes [ 'Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp' ];

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

    this.newState = true
    this.loaded = false

    this.modelPromise.then((gltf) => {
      this.model = gltf.scene.children[0]
      this.model.position.x = -18
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

      this.fadeToAction('Idle', 0)
      this.loaded = true
    })

    this.stateStack = []
  }

  position() {
    if(this.loaded) {
      return this.model.position
    } else {
      return {x: 0, y: 0, z: 0}
    }
  }

  rotation() {
    if(this.loaded) {
      return this.model.rotation
    } else {
      return {x: 0, y: 0, z: 0}
    }
  }

  fadeToAction(name, durationSeconds) {
    this.previousAction = this.activeAction
    this.activeAction = this.actions[name]

    if (this.previousAction && this.previousAction !== this.activeAction) {
      this.previousAction.fadeOut(durationSeconds)
    }

    this.activeAction
      .reset()
      .setEffectiveTimeScale( 1 )
      .setEffectiveWeight( 1 )
      .fadeIn( durationSeconds )
      .play()
  }

  mount(scene, clock) {
    this.modelPromise.then((gltf) => {
      scene.add(gltf.scene.children[0])
    })
  }

  pushState(state) {
    this.stateStack.unshift(state)
    this.newState = true
  }

  animate(scene, clock) {
    if(!this.loaded) {
      return
    }
    const dt = clock.getDelta()
    const curr = clock.getElapsedTime()

    if(this.stateStack.length === 0) {
      this.pushState(new IdleState(this))
    }

    if(this.newState) {
      this.stateStack[0].activate(curr, this)
      this.newState = false
    }

    const complete = this.stateStack[0].update(dt, curr, this)
    if(complete) {
      this.stateStack.shift()
      this.newState = true
    }

    if ( this.mixer ) this.mixer.update( dt )
  }
}

export default Robot