import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseDetailsItem from '../CourseDetailsItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {courseDetailsList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getApiDetails()
  }

  getApiDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`

    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = [fetchedData.course_details].map(eachItem => ({
        id: eachItem.is,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
        description: eachItem.description,
      }))
      this.setState({
        courseDetailsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" height={50} width={50} color="pink" />
    </div>
  )

  onClickRetry = () => {
    this.getApiDetails()
  }

  renderFailureView = () => (
    <div className="error-message-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h4>Oops! Something Went Wrong</h4>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {courseDetailsList} = this.state
    return (
      <>
        {courseDetailsList.map(eachItem => (
          <CourseDetailsItem key={eachItem.id} eachDetails={eachItem} />
        ))}
      </>
    )
  }

  renderCourseDetails = () => {
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
      <>
        <Header />
        {this.renderCourseDetails()}
      </>
    )
  }
}

export default CourseDetails
