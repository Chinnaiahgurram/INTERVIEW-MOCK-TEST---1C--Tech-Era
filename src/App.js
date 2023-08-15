import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import CourseDetails from './components/CourseDetails'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
