import React, {Component} from 'react'

class TodoComponent extends Component {
  constructor() {
    super()

    this.state = {tasks: []}
  }

  componentDidMount() {
    const update = () => {
      this.props.todoist.getTasks().then((tasks) => {
        tasks.sort((t1, t2) => t1.order - t2.order)
        this.setState({tasks})
        window.setTimeout(update, 1500)
      })
    }
    update()
  }

  renderTasks() {
    let first = true
    return this.state.tasks.slice(0, 5).map((task) => {
      const alertClass = first ? "success" : "primary"
      first = false
      return (<div key={task.id} className={`alert alert-${alertClass} todo-item`}>
        <span className="todo-item">{task.content}</span>
      </div>)
    })
  }

  render() {
    return (
      <div className="streamos-container todos">
        <div className="inner">
          <h1>Stream Todo</h1>
          {this.renderTasks()}
        </div>
      </div>
    )
  }
}

export default TodoComponent
