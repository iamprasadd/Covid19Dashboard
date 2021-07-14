import objectPath from 'object-path'
import {Component} from 'react'
import './index.css'

class India extends Component {
  state = {covidData: []}

  componentDidMount() {
    this.getCovidData()
  }

  getCovidData = async () => {
    const response = await fetch(
      'https://api.covid19india.org/v4/min/data.min.json',
    )
    const data = await response.json()

    const {TT} = data
    const {total} = TT
    const {confirmed} = total

    const totalConfirmed = confirmed
    const totalRecovered = Object.keys(data)
      .filter(state => state === 'TT')
      .map(e => objectPath.get(data, `${e}.total.recovered`))

    const totalDeceased = Object.keys(data)
      .filter(state => state === 'TT')
      .map(e => objectPath.get(data, `${e}.total.deceased`))
    const totalOther = Object.keys(data)
      .filter(state => state === 'TT')
      .map(e => objectPath.get(data, `${e}.total.other`))

    const totalActive =
      totalConfirmed - totalRecovered - totalDeceased - totalOther

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

  render() {
    const {covidData} = this.state
    return (
      <div className="cat">
        <ul className="total-category-container">
          {covidData.map(each => (
            <li
              className={`category-item ${each.name}1`}
              tabIndex="-1"
              key={each.name}
              value={each.name}
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
export default India
