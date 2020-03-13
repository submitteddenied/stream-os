import React, {Component} from 'react'
import ProgressBarComponent from './ProgressBarComponent'

class ProgressListComponent extends Component {
  constructor() {
    super()
  }

  renderProgressBars() {
    const result = this.props.items.map((item, i) => 
      <ProgressBarComponent key={i} item={item} />
    )

    return result
  }

  render() {
    return (
      <div className="progress-list">
        {this.renderProgressBars()}
      </div>
    )
  }
}

export default ProgressListComponent
