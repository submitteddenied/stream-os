import React, {Component} from 'react'

class TodoComponent extends Component {
  constructor() {
    super()

    this.state = {tasks: []}
  }

  componentDidMount() {
    const update = () => {
      this.props.todoist.getTasks().then((tasks) => {
        this.setState({tasks})
        window.setTimeout(update, 1000)
      })
    }
    update()
  }

  renderTasks() {
    return this.state.tasks.map((task) => {
      return (<div key={task.id} className="alert alert-primary">
        {task.content}
      </div>)
    })
  }

  render() {
    return (
      <div>
        <h1>Todo</h1>
        {this.renderTasks()}
      </div>
    )
  }
}

export default TodoComponent
