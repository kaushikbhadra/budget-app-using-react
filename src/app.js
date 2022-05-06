import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { startSetExpenses } from './actions/expenses'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'

import './styles/style.scss'
import 'normalize.css/normalize.css'
import './firebase/firebase'
const store = configureStore()
const jsx = (
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
)
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'))

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById('app'))
})
