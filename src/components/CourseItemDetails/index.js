import {Link} from 'react-router-dom'
import './index.css'

const CourseItemDetails = props => {
  const {eachCourse} = props
  const {id, name, logoUrl} = eachCourse
  return (
    <li>
      <Link to={`/courses/${id}`} className="link">
        <div className="each-course-container">
          <img className="logo" src={logoUrl} alt={name} />
          <p className="name">{name}</p>
        </div>
      </Link>
    </li>
  )
}
export default CourseItemDetails
