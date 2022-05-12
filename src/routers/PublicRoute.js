import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...leftData
}) => (
  <Route
    {...leftData}
    component={(props) =>
      isAuthenticated ? <Redirect to='/dashboard' /> : <Component {...props} />
    }
  />
)

const mapStartToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
})

export default connect(mapStartToProps)(PublicRoute)
