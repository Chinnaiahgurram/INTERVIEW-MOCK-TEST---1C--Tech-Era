import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {eachDetails} = props
  const {id, name, logoUrl} = eachDetails
  return (
    <Link to={`/courses/${id}`}>
      <div className="course-container">
        <img src={logoUrl} className="image2" alt={name} />
        <p>{name}</p>
      </div>
    </Link>
  )
}

export default CourseItem
