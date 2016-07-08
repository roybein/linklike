import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import {getAllNotifis} from './../../actions/notifs'
import notifiStore from './../../reducers/notifiStore'
import NotifiList from './../../containers/NotifiList'
import NewLink from './../../containers/test'
import Notifi from './../../components/Notifi'

let store = createStore(notifiStore)

store.dispatch(getAllNotifis())

render(
  <Provider store={store}>
    <NotifiList />
  </Provider>,
  document.getElementById('notifiList')
)
