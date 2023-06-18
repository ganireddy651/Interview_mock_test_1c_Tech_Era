import {Component} from 'react'
import {withRouter} from 'react-router-dom'
// import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseItemDetails from '../CourseItemDetails'
import './index.css'

const fetchStatus = {
  initial: 'initial',
  success: 'success',
  inProgress: 'inProgress',
  failure: 'failure',
}

class Home extends Component {
  state = {data: [], status: fetchStatus.initial}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({status: fetchStatus.inProgress})
    // const url = 'https://apis.ccbp.in/te/courses'
    // const option = {
    //   method: 'GET',
    // }
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({data: updatedData, status: fetchStatus.success})
    } else if (response.status === 404) {
      this.setState({status: fetchStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {data} = this.state
    return (
      <ul className="list-container">
        {data.map(eachCourse => (
          <CourseItemDetails eachCourse={eachCourse} key={eachCourse.id} />
        ))}
      </ul>
    )
  }

  onClickRetry = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.onClickRetry} className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  renderInProgress = () => (
    <div data-testid="loader" className="loader">
      <p>loading</p>
    </div>
  )

  renderData = () => {
    const {status} = this.state
    switch (status) {
      case fetchStatus.success:
        return this.renderSuccessView()
      case fetchStatus.failure:
        return this.renderFailureView()
      case fetchStatus.inProgress:
        return this.renderInProgress()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="courses-container">
          <h1>Courses</h1>
          {this.renderData()}
        </div>
      </>
    )
  }
}

export default withRouter(Home)
