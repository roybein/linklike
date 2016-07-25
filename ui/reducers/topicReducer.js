import {combineReducers } from 'redux'

const topicsFetchReducer = (state = {
  isFeteching: false,
  topics: []
}, action) => {
  switch (action.type) {
    case 'GET_FAKE_NOTIFIS':
      return Object.assign({}, state, {topics: action.topics});
    case 'REQUEST_NOTIFIS':
      return Object.assign({}, state, {isFeteching: true});
    case 'RECEIVE_NOTIFIS':
      return Object.assign({}, state, {topics: action.topics});
    case 'NEW_NOTIFI_DONE':
      return Object.assign({}, state, {topics: [...state.topics, action.topic]});
    default:
      return state;
  }
}

const topicNewReducer = (state = {
  isAdding: false,
  topic: ""
}, action) => {
  switch (action.type) {
    case 'NEW_NOTIFI_START':
      return Object.assign({}, state, {isAdding: true});
    case 'NEW_NOTIFI_DONE':
      return Object.assign({}, state, {topic: ""});
    default:
      return state;
  }
}

const topicReducer = combineReducers({
  topicsFetchReducer,
  topicNewReducer
})

export default topicReducer
