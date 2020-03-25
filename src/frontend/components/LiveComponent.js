import React, {Component} from 'react'
import TodoComponent from './TodoComponent'
import CameraFrameComponent from './CameraFrameComponent'
import ThreeDeeCanvas from './ThreeDeeCanvas'

import RotatingCube from '../characters/RotatingCube'
import Robot from '../characters/Robot/Robot'

class LiveComponent extends Component {
  constructor() {
    super()
  }

  render() {
    const characterList = [new RotatingCube(), new Robot()]
    return (
      <div>
        <ThreeDeeCanvas characters={characterList} />
        <CameraFrameComponent />
        <TodoComponent todoist={this.props.todoist} />
      </div>
    )
  }
}

export default LiveComponent
