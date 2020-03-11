import React, {Component} from 'react'

class StreamOSContainer extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className={["streamos-container", this.props.className].join(' ')}>
        <div className="inner">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default StreamOSContainer
