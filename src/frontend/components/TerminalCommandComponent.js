import React, {Component} from 'react'
import util from '../util'

const TYPING_SPEED_MS = 100 // real?

class TerminalCommandComponent extends Component {
  constructor() {
    super()
    this.state = {
      commandChars: 0,
      mode: 'input',
      outputLines: 0
    }
  }

  componentDidMount() {
    this.step()
  }

  componentWillUnmount() {
    if(this.interval) {
      clearTimeout(this.interval)
    }
  }

  step() {
    this.interval = null
    const command = this.props.command
    let delay
    let done = false
    if(this.state.mode === 'input') {
      const commandChars = this.state.commandChars + 1
      const mode = commandChars === command.input.length ? 'output': 'input'
      delay = util.jitter(TYPING_SPEED_MS, 0.1)
      this.setState({
        commandChars,
        mode
      })
    } else { // mode === output
      if(this.state.outputLines < command.output.length) {
        const outputLines = this.state.outputLines + 1
        this.setState({
          outputLines
        })
        delay = command.outputTiming
      } else {
        done = true
      }
    }

    if(done) {
      this.props.onDone()
    } else {
      this.interval = window.setTimeout(() => this.step(), delay)
    }
  }

  renderPrompt() {
    return <span className="prompt">
        <span className="user">submitteddenied</span>
        <span className="separator">@</span>
        <span className="host">streamos </span>
        <span className="path">~</span>
        <span className="prompt">$</span>
      </span> 
  }

  renderInput() {
    let cursor
    if(this.props.active && this.state.mode === 'input') {
      cursor = <span className="cursor">|</span>
    }
    const command = this.props.command.input.slice(0, this.state.commandChars)
    return <span className="input">{command}{cursor}</span>
  }

  renderOutput() {
    return this.props.command.output.slice(0, this.state.outputLines).map((line) => {
      return <div className="stdout">{line}</div>
    })
  }

  render() {
    return (
      <div className="command">
        <div className="inputLine">
          {this.renderPrompt()}
          {this.renderInput()}
        </div>
        <div className="output">
          {this.renderOutput()}
        </div>
      </div>
    )
  }
}

export default TerminalCommandComponent