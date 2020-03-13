import React, {Component} from 'react'

import util from '../util'

class CountdownComponent extends Component {
  constructor() {
    super()
    this.state = {
      remaining: 0
    }
  }

  componentDidMount() {
    this.startTime = (new Date()).getTime()
    this.active = true
    this.updateTimer()    
  }
  
  updateTimer() {
    const now = (new Date()).getTime()
    const remaining = (this.startTime + (this.props.durationSeconds * 1000)) - now
    this.setState({
      remaining: remaining < 0 ? 0 : remaining
    })
    if(this.active) {
      window.requestAnimationFrame(() => this.updateTimer())
    }
  }

  componentWillUnmount() {
    this.active = false
  }

  formatTime(millis) {
    // 123456 (milli)
    // 123.456s
    // 2:03.456
    if(millis === 0) {
      return "0:00.00"
    }

    const seconds = util.roundToPlaces(millis / 1000, 3)
    const minutes = Math.floor(seconds / 60)
    let secondsLength = 2
    if(minutes < 1) {
      secondsLength += 3 // .00
    }
    let secondsString = (seconds % 60).toString()
    if(seconds % 60 < 10) {
      secondsString = "0" + secondsString
    }
    return `${minutes}:${secondsString.slice(0, secondsLength)}`
  }

  render() {
    return (
      <h1>T-{this.formatTime(this.state.remaining)}</h1>
    )
  }
}

export default CountdownComponent
