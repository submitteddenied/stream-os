import React, {Component} from 'react'

import util from '../../util'

const VALUES = {
  "Water world": {
    "Terraformable": {
      "mapped": 1119231,
      "unmapped": 3229773
    }
  }
}

class ExplorationComponent extends Component {
  constructor() {
    super()
    this.cache = {}
    this.state = {
      currentSystem: false,
      scanned: false,
      complete: false
    }
  }

  mapList() {
    const items = this.props.bodiesToMap.map((body) => {
      return {
        body,
        mapped: false,
        el: <li className="failure"><span className="unmapped" key={body}>{body}</span></li>
      }
    }).concat(this.props.mappedBodies.map((body) => {
      return {
        body,
        mapped: true,
        el: <li className="success"><span className="mapped" key={body}>{body}</span></li>
      }
    }))

    return items.sort((a, b) => {
      const nameA = a.body.toUpperCase()
      const nameB = b.body.toUpperCase()
      if(nameA < nameB) return -1
      if(nameB > nameA) return 1
      return 0
    }).map((i) => i.el)
  }

  checkSystemMapped() {
    if(this.state.currentSystem === this.props.currentSystem.StarSystem) {
      return
    }
    new Promise((res) => {
      if(this.cache[this.props.currentSystem.StarSystem] !== undefined) {
        res(this.cache[this.props.currentSystem.StarSystem])
      } else {
        const url = [
          'https://www.edsm.net/api-v1/system',
          util.qs({
            systemName: this.props.currentSystem.StarSystem,
            showCoordinates: 1
          })
        ].join('?')
        window.fetch(url).then((res) => res.json())
          .then((data) => {
            this.cache[this.props.currentSystem.StarSystem] = data
            res(data)
          })
      }
    }).then((data) => {
      const knownToEdsm = !(Array.isArray(data) && data.length === 0)
      this.setState({currentSystem: this.props.currentSystem.StarSystem, loading: false, knownToEdsm})
    })
  }

  mappedLabel() {
    if(this.state.currentSystem) {
      if(this.state.loading) {
        return <li className="loading"><span>EDSM</span></li>
      }

      return <li className={this.state.knownToEdsm ? 'success' : 'failure'}><span>EDSM</span></li>
    }

    return <li className="loading"><span>EDSM</span></li>
  }

  scannedLabel() {
    return <li className={this.props.systemScanned ? 'success' : 'failure'}><span>FSS Scan</span></li>
  }

  render() {
    if(this.props.currentSystem.StarSystem === undefined) {
      return (<div className="streamos-container elite exploration">
        <div className="inner">
          <h1 className="loading">Connecting...</h1>
        </div>
      </div>
      )
    }
    this.checkSystemMapped()
    return (<div className="streamos-container elite exploration">
      <div className="inner">
        <h1 className="current">{this.props.currentSystem.StarSystem}</h1>
        <ul className="meta">
          {this.mappedLabel()}
          {this.scannedLabel()}
        </ul>
        
        <ul className="scanList">
          {this.mapList()}
        </ul>
      </div>
    </div>)
  }
}

export default ExplorationComponent
