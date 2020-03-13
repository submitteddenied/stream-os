import React, {Component} from 'react'
import TodoComponent from './TodoComponent'
import CameraFrameComponent from './CameraFrameComponent'

class LiveComponent extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <CameraFrameComponent />
        <TodoComponent todoist={this.props.todoist} />
      </div>
    )
  }
}

export default LiveComponent
