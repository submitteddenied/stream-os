import React, {Component} from 'react'
import util from '../util'

const MODES = {
  'percent': {
    suffix: '%',
    places: 1,
    jitter: 0
  },
  'count': {
    suffix: '',
    places: 0,
    jitter: 0.05
  },
  'download': {
    suffix: ' MiB',
    places: 3,
    jitter: 0.1
  }
}

const DURATION_JITTER = 0.3

const jitter = (value, amount) => {
  let jitter = value * amount * 2
  jitter = Math.random() * jitter
  jitter -= jitter / 2

  return value + jitter
}

class ProgressBarComponent extends Component {
  constructor() {
    super()
    this.state = {
      current: 0,
      percentFill: 0
    }
  }

  componentDidMount() {
    this.duration = jitter(this.props.item.durationSeconds, DURATION_JITTER) * 1000
    switch(this.props.item.mode) {
      case 'percent':
        this.max = 100
        break
      case 'count':
        this.max = jitter(this.props.item.count, MODES.count.jitter)
        break
      case 'download':
        this.max = jitter(this.props.item.size, MODES.download.jitter)
        break
    }
    window.requestAnimationFrame((t) => this.update(t))
  }

  update(timestamp) {
    if(!this.start) {
      this.start = timestamp
    }
    const progress = timestamp - this.start
    const percentFill = Math.min(progress / this.duration, 1)
    this.setState({
      current: this.max * percentFill,
      percentFill
    })
    if(percentFill < 1) {
      window.requestAnimationFrame((t) => this.update(t))
    }
  }

  statusBar(percentage) {
    if(percentage < 1) {
      const percentageStyle = percentage * 100 + '%'
      return (
        <div className="bar-outer">
          <div className="bar-inner in-progress" style={{width: percentageStyle}}></div>
        </div>
      )
    }
    return (
      <div className="bar-outer">
        <div className="bar-inner complete"></div>
      </div>
    )
  }

  render() {
    const current = util.roundToPlaces(this.state.current, MODES[this.props.item.mode].places)
    const max = util.roundToPlaces(this.max, MODES[this.props.item.mode].places)
    const suffix = MODES[this.props.item.mode].suffix
    return (
      <div className="progress-bar">
        <h1 className="title">{this.props.item.title}</h1>
        {this.statusBar(parseFloat(current) / parseFloat(max))}
        <h2>{current}{suffix} / {max}{suffix}</h2>
      </div>
    )
  }
}

export default ProgressBarComponent
