import {Component} from 'react'
import './index.css'

class EachStateTotal extends Component {
  state = {covidData: []}

  componentDidMount() {
    this.getEachState()
  }

  getEachState = async () => {
    const {eachStateTotalData} = this.props

    const totalConfirmed = eachStateTotalData.confirmed
    const totalRecovered = eachStateTotalData.recovered

    const totalDeceased = eachStateTotalData.deceased

    const totalActive = totalConfirmed - totalRecovered - totalDeceased

    const updated = [
      {
        name: 'Confirmed',
        logo:
          'https://res.cloudinary.com/prasadreddy/image/upload/c_scale,h_40,w_40/v1625824473/Group_l5hjgx.png',
        value: totalConfirmed,
      },
      {
        name: 'Active',
        logo:
          'https://res.cloudinary.com/prasadreddy/image/upload/c_scale,h_40,w_40/v1625825006/protection_1_lmcx9l.png',
        value: totalActive,
      },
      {
        name: 'Recovered',
        logo:
          'https://res.cloudinary.com/prasadreddy/image/upload/c_scale,w_40/v1625825114/recovered_1_qs1y8f.png',
        value: totalRecovered,
      },
      {
        name: 'Deceased',
        logo:
          'https://res.cloudinary.com/prasadreddy/image/upload/c_scale,w_40/v1625825199/Outline_qoly2o.png',
        value: totalDeceased,
      },
    ]
    this.setState({covidData: updated})
  }

  onGetTotal = value => {
    const {onGetCategory} = this.props
    onGetCategory(value)
  }

  render() {
    const {covidData} = this.state
    return (
      <div className="cat">
        <ul className="total-category-container">
          {covidData.map(each => (
            <li
              className={`category-item ${each.name}`}
              tabIndex="-1"
              key={each.name}
              value={each.name}
              onClick={() => this.onGetTotal(each.name)}
            >
              <h1 className="category-name">{each.name}</h1>
              <img src={each.logo} alt={each.name} />
              <h1 className="category-value">{each.value}</h1>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
export default EachStateTotal
