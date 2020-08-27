import React, {Component} from 'react'
import TodoComponent from './TodoComponent'
import CameraFrameComponent from './CameraFrameComponent'
import ThreeDeeCanvas from './ThreeDeeCanvas'
import ExplorationComponent from './EliteDangerous/ExplorationComponent'

import Robot from '../characters/Robot/Robot'

class LiveComponent extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.state.subscribe(() => this.forceUpdate())
  }

  render() {
    const characterList = [] //new Robot()]
    return (
      <div>
        <ThreeDeeCanvas characters={characterList} />
        <ExplorationComponent {...this.props.state.getState().elite} />
      </div>
    )
  }
}

export default LiveComponent
