import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { startSetExpenses } from './actions/expenses'
import { login, logout } from './actions/auth'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'

import './styles/style.scss'
import 'normalize.css/normalize.css'
import { firebaseAuth, authApp } from './firebase/firebase'
const store = configureStore()
const jsx = (
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
)

let hasRendered = false
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'))
    hasRendered = true
  }
}
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'))

firebaseAuth.onAuthStateChanged(authApp, (user) => {
  if (user) {
    store.dispatch(login(user.uid))
    store.dispatch(startSetExpenses()).then(() => {
      renderApp()
      if (history.location.pathname === '/') {
        history.push('/dashboard')
      }
    })
  } else {
    store.dispatch(logout())
    renderApp()
    history.push('/')
  }
})
