import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <h5>Page Not found</h5>
      <p> We are sorry, the page you requested could not be found</p>
    </div>
  </>
)
export default NotFound
