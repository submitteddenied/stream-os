import React, {Component} from 'react'
import SOSContainer from './StreamOSContainer'
import CountdownComponent from './CountdownComponent'
import ProgressListComponent from './ProgressListComponent'

import config from '../config/boot.json'

class BootingComponent extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="boot-container">
        <SOSContainer className="main-container">
          <h1>Hello</h1>
        </SOSContainer>
        <SOSContainer className="progress-container">
          <ProgressListComponent items={config.progressList} />
        </SOSContainer>
        <SOSContainer className="countdown-container">
          <CountdownComponent durationSeconds={config.countdownSeconds} />
        </SOSContainer>
      </div>
    )
  }
}

export default BootingComponent
