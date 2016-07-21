import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import {getAllNotifis, fetchNotifis} from './../../actions/notifs'
import notifiReducer from './../../reducers/notifiReducer'
import NotifiManager from './../../containers/NotifiManager'

const store = createStore(notifiReducer, applyMiddleware(thunkMiddleware));

store.dispatch(fetchNotifis());

render(
  <Provider store={store}>
    <NotifiManager />
  </Provider>,
  document.getElementById('notifiList')
)
