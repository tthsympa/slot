import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Dashboard from './Dashboard'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exat path="/dashboard" component={Dashboard} />
        <Redirect to="/dashboard" />
      </Switch>
    </Router>
  )
}

export default App
