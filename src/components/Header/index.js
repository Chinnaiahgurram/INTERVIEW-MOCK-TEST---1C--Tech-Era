import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="nav-header">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="logo-image"
      />
    </Link>
  </div>
)

export default withRouter(Header)
