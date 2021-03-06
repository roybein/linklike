import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import {getPubbees, getSubbees} from './../../actions/topic.js'
import topicReducer from './../../reducers/topicReducer'
import TopicManager from './../../containers/TopicManager'

const store = createStore(topicReducer, applyMiddleware(thunkMiddleware));

store.dispatch(getPubbees());
store.dispatch(getSubbees());

render(
  <Provider store={store}>
    <TopicManager />
  </Provider>,
  document.getElementById('topicManager')
)
