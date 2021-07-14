import {Component} from 'react'
import './index.css'

class AllStates extends Component {
  render() {
    const {statesInfo} = this.props
    const {
      stateName,
      confirmed,
      recovered,
      deceased,
      other,
      population,
    } = statesInfo
    const active = confirmed - recovered - deceased - other
    return (
      <div>
        <div className="states-container">
          <p className="width">{stateName}</p>
          <p className="confirmed width">{confirmed}</p>
          <p className="active width">{active}</p>
          <p className="recovered width">{recovered}</p>
          <p className="deceased width">{deceased}</p>
          <p className="population width">{population}</p>
        </div>
      </div>
    )
  }
}

export default AllStates
