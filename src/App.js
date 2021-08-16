import './App.css'
import SignIn from './components/SignIn'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SignUp from './components/SignUp'
import NotFound from './components/NotFound'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import AdminPage from './components/AdminPage'
import { ProvideAuth } from './components/use-auth'

function App () {
  return (
    <ProvideAuth>
      <div className="App">
        <Switch>

          <Route path="/" component={SignIn} exact/>
          <Route path="/login" component={SignIn} exact/>
          <Route path="/signup" component={SignUp}/>

          <PrivateRoute path="/dashboard">
            <Dashboard/>
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <AdminPage/>
          </PrivateRoute>

          <Route component={NotFound}/>
        </Switch>
      </div>
    </ProvideAuth>
  )
}

export default App
