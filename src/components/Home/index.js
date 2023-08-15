import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import CourseItem from '../CourseItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {coursesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getApiData()
  }

  getApiData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'

    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.courses.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        logoUrl: eachItem.logo_url,
      }))
      this.setState({
        coursesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="Three-dots" height={50} width={50} color="red" />
    </div>
  )

  onClickRetry = () => {
    this.getApiData()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for </p>
      <button type="submit" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {coursesList} = this.state

    return (
      <>
        <div className="courses-container">
          <h1 className="heading">Courses</h1>
        </div>
        <ul>
          <li className="total-container">
            {coursesList.map(eachItem => (
              <div className="item-container">
                <CourseItem key={eachItem.id} eachDetails={eachItem} />{' '}
              </div>
            ))}
          </li>
        </ul>
      </>
    )
  }

  renderCourses = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <Header />
        {this.renderCourses()}
      </div>
    )
  }
}

export default Home
