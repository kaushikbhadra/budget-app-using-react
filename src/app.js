import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense } from './actions/expenses'

import './styles/style.scss'
import 'normalize.css/normalize.css'
const store = configureStore()

store.dispatch(
  addExpense({ description: 'Water Bill', amount: 500, createdAt: -22000 })
)
store.dispatch(
  addExpense({ description: 'Gas Bill', amount: 1000, createdAt: -1000 })
)
store.dispatch(
  addExpense({ description: 'Rent', amount: 10000, createAt: -21000 })
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
)
