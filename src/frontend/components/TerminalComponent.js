import React, {Component} from 'react'
import TerminalCommandComponent from './TerminalCommandComponent'

const commandList = require('../util/commands')

class TerminalComponent extends Component {
  constructor() {
    super()
    this.state = {
      commands: []
    }
  }

  componentDidMount() {
    this.addCommand()
  }

  addCommand() {
    const commandIdx = this.state.commands.length + 1
    const newCommand = commandList[commandIdx % commandList.length]
    const commandComponent = <TerminalCommandComponent command={newCommand} key={commandIdx} onDone={() => this.addCommand()} />
    this.state.commands.push(commandComponent)
    this.setState(this.state)
  }

  renderCommands() {
    return this.state.commands
  }

  render() {
    return (
      <div className="terminal">
        {this.renderCommands()}
      </div>
    )
  }
}

export default TerminalComponent
