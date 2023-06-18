import {Component} from 'react'
// import {Loader} from 'react-loader-spinner'
import Header from '../Header'
import CourseDetails from '../CourseDetails'
import './index.css'

const fetchStatus = {
  initial: 'initial',
  success: 'success',
  inProgress: 'inProgress',
  failure: 'failure',
}

class Courses extends Component {
  state = {data: {}, status: fetchStatus.initial}

  componentDidMount() {
    this.getCourse()
  }

  getCourse = async () => {
    this.setState({status: fetchStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const data = await response.json()
    const convertedData = data.course_details

    if (response.ok === true) {
      const newData = {
        id: convertedData.id,
        name: convertedData.name,
        imageUrl: convertedData.image_url,
        description: convertedData.description,
      }

      this.setState({data: newData, status: fetchStatus.success})
    }
    if (response.status === 404) {
      this.setState({status: fetchStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {data} = this.state
    // console.log(data)

    return (
      <div>
        <CourseDetails each={data} key={data.id} />
      </div>
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

  renderInProgressView = () => (
    <div data-testid="loader" className="loader">
      <p>loading</p>
    </div>
  )

  renderFetchedData = () => {
    const {status} = this.state

    switch (status) {
      case fetchStatus.success:
        return this.renderSuccessView()
      case fetchStatus.failure:
        return this.renderFailureView()
      case fetchStatus.inProgress:
        return this.renderInProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="card-container">{this.renderFetchedData()}</div>
      </>
    )
  }
}
export default Courses
