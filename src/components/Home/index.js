import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import AllStates from '../AllStates'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'
import India from '../India'

class Home extends Component {
  state = {statesInfo: [], isLoading: true, searchInput: ''}

  componentDidMount() {
    this.getCovidData()
  }

  getCovidData = async () => {
    const {statesList} = this.props
    const response = await fetch(
      'https://api.covid19india.org/v4/min/data.min.json',
    )
    const data = await response.json()

    const states = statesList.map(each => ({
      stateName: each.state_name,
      stateCode: each.state_code,
      confirmed: Object.keys(data)
        .filter(state => state === each.state_code)
        .map(e => data[e].total.confirmed),
      recovered: Object.keys(data)
        .filter(state => state === each.state_code)
        .map(e => data[e].total.recovered),
      deceased: Object.keys(data)
        .filter(state => state === each.state_code)
        .map(e => data[e].total.deceased),
      other: Object.keys(data)
        .filter(state => state === each.state_code)
        .map(e => data[e].total.other),
      population: Object.keys(data)
        .filter(state => state === each.state_code)
        .map(e => data[e].meta.population),
    }))

    this.setState({statesInfo: states, isLoading: false})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchResults = () => {
    const {searchInput} = this.state
    const {statesList} = this.props
    const searchResults = statesList.filter(eachApp =>
      eachApp.state_name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResults
  }

  render() {
    const {statesInfo, isLoading, searchInput} = this.state
    const filtered = this.getSearchResults()

    return (
      <div className="covid-bg-container">
        <Header />
        <div className="search-container">
          <div className="search-bar ">
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/app-store/app-store-search-img.png"
                alt="search-icon"
                className="search-icon"
              />
              <input
                type="search"
                placeholder="Enter the state"
                className="search-input"
                onChange={this.onChangeSearchInput}
              />
            </div>
            <div>
              {searchInput !== '' ? (
                <div>
                  {filtered.map(option => (
                    <Link
                      to={`/search/${option.state_code}`}
                      className="link"
                      key={option.state_name}
                    >
                      <div className="option-item">
                        <div>
                          <h1 className="option-state-name">
                            {option.state_name}
                          </h1>
                        </div>
                        <div className="option-code-container">
                          <h1 className="state-code">{option.state_code}</h1>
                          <img
                            className="option-icon"
                            src="https://res.cloudinary.com/prasadreddy/image/upload/v1626105750/72e0142e-8457-4b15-9d74-264bd1a394fd_bzhheo.jpg"
                            alt="icon"
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          <India />
        )}

        <div className="statewise-info">
          <div className="statewise-heading">
            <p className="width">States/UT</p>
            <p className="width">Confirmed</p>
            <p className="width">Active</p>
            <p className="width">Recovered</p>
            <p className="width">Deceased</p>
            <p className="width">Population</p>
          </div>
          {statesInfo.map(each => (
            <AllStates statesInfo={each} key={each.stateCode} />
          ))}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
