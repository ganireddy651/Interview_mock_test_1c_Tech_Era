import './index.css'

const CourseDetails = props => {
  const {each} = props
  console.log(each)
  const {name, description, imageUrl} = each
  return (
    <div className="container">
      <img src={imageUrl} alt={name} />
      <div className="container1">
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default CourseDetails
