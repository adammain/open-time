import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LandingPage from '../LandingPage/LandingPage'
import LoginPage from '../LoginPage/LoginPage'
import Dashboard from '../Dashboard/Dashboard'

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
      </Switch>
    </>
  )
}

export default App