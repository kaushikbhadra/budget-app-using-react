import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...leftData
}) => (
  <Route
    {...leftData}
    component={(props) =>
      isAuthenticated ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to='/' />
      )
    }
  />
)

const mapStartToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
})

export default connect(mapStartToProps)(PrivateRoute)
