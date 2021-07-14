import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import objectPath from 'object-path'
import {Component} from 'react'
import Header from '../Header'
import EachStateTotal from '../EachStateTotal'

import './index.css'

class State extends Component {
  state = {
    totalTested: '',
    date: '',
    category: 'confirmed',
    output: [],
    eachStateTotalData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getDateAndTested()
  }

  getDateAndTested = async () => {
    const {match} = this.props

    const {params} = match
    const {id} = params
    const response = await fetch(
      'https://api.covid19india.org/v4/min/data.min.json',
    )
    const data = await response.json()

    const distData = data[id].districts
    const eachState = data[id].total

    const {TT} = data
    const {total} = TT
    const {tested} = total
    this.setState({totalTested: tested})

    const getData = Object.keys(data)
      .filter(each => each === id)
      .map(e => objectPath.get(data, `${e}.meta.last_updated`))

    const date = new Date(getData)

    const ans = date.toLocaleString('en-US', {
      weekday: 'short',
      day: 'numeric',
      year: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    this.setState({
      date: ans,
      output: distData,
      eachStateTotalData: eachState,
      isLoading: false,
    })
  }

  getStateName = () => {
    const {match, statesList} = this.props
    const {params} = match
    const {id} = params
    const stateName = statesList.filter(each => each.state_code === id)
    return stateName[0].state_name
  }

  onGetCategory = categoryVal => {
    this.setState({category: categoryVal})
  }

  getCategoryWiseData = () => {
    const {output, category} = this.state

    const distNamesList = Object.keys(output)
    const categoryLower = category.toLowerCase()

    const categoryData = distNamesList.map(element => ({
      distName: element,
      value: output[element].total[categoryLower],
    }))

    categoryData.sort((a, b) => b.value - a.value)
    const removeNonValues = categoryData.filter(eachDist => eachDist.value > 0)

    const activeCases = distNamesList.map(element => ({
      distName: element,
      value:
        output[element].total.confirmed -
        output[element].total.recovered -
        output[element].total.deceased,
    }))
    activeCases.sort((a, b) => b.value - a.value)
    const removeActiveNullValues = activeCases.filter(each => each.value > 0)
    if (categoryLower === 'active') {
      return removeActiveNullValues
    }
    return removeNonValues
  }

  render() {
    const stateNameVal = this.getStateName()
    const {
      totalTested,
      date,
      category,
      eachStateTotalData,
      isLoading,
    } = this.state
    const cat = this.getCategoryWiseData()

    return (
      <div className="state-bg-container">
        <Header />
        <div className="state-container">
          <div className="state-info">
            <div className="state-details-container">
              <div className="state-name-container">
                <h1 className="state-name">{stateNameVal}</h1>
              </div>
              <div>
                <p className="updated-date">{date}</p>
              </div>
            </div>
            <div>
              <p className="tests-heading">Tested</p>
              <p className="tests-count">{totalTested}</p>
            </div>
          </div>
          {isLoading ? (
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          ) : (
            <EachStateTotal
              onGetCategory={this.onGetCategory}
              eachStateTotalData={eachStateTotalData}
            />
          )}

          <div className="total-districts-container">
            <h1 className={`districts-heading ${category}-dist-color`}>
              Top Districts
            </h1>
            <div className="districts">
              {cat.map(each => (
                <div className="districts-container" key={each.distName}>
                  <p className="district-name">{each.distName}</p>
                  <p className="district-values">{each.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default State
