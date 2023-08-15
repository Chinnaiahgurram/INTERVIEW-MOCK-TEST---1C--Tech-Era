import './index.css'

const CourseDetailsItem = props => {
  const {eachDetails} = props
  const {name, imageUrl, description} = eachDetails

  return (
    <div className="background-container">
      <img src={imageUrl} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default CourseDetailsItem
