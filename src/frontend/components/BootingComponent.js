import React, {Component} from 'react'
import SOSContainer from './StreamOSContainer'

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
          <h1>World</h1>
        </SOSContainer>
        <SOSContainer className="countdown-container">
          <h1>T-05:00.00</h1>
        </SOSContainer>
      </div>
    )
  }
}

export default BootingComponent
