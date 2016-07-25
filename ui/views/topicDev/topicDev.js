import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import {getAllTopics, fetchTopics} from './../../actions/topic.js'
import topicReducer from './../../reducers/topicReducer'
import TopicManager from './../../containers/TopicManager'

const store = createStore(topicReducer, applyMiddleware(thunkMiddleware));

store.dispatch(fetchTopics());

render(
  <Provider store={store}>
    <TopicManager />
  </Provider>,
  document.getElementById('topicList')
)
