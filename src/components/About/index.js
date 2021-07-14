import Linkify from 'react-linkify'
import {Component} from 'react'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

class About extends Component {
  state = {faqsList: []}

  componentDidMount() {
    this.getFaqs()
  }

  getFaqs = async () => {
    const response = await fetch(
      'https://api.covid19india.org/website_data.json',
    )
    const data = await response.json()
    const listItems = data.faq.map(eachFaq => ({
      question: eachFaq.question,
      answer: eachFaq.answer,
    }))
    this.setState({faqsList: listItems})
  }

  render() {
    const {faqsList} = this.state

    return (
      <div className="about-container">
        <Header />
        <div className="about-section">
          <h1 className="about-heading">About</h1>
          {faqsList.map(each => (
            <ul className="list-items-container" key={each.question}>
              <li className="question">{each.question}</li>
              <Linkify>
                <li className="answer">{each.answer}</li>
              </Linkify>
            </ul>
          ))}
        </div>

        <Footer />
      </div>
    )
  }
}
export default About
