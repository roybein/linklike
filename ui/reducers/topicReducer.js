import {combineReducers } from 'redux'

const getPubbeesReducer = (state = {
  isGetting: false,
  pubbees: []
}, action) => {
  switch (action.type) {
    case 'GET_FAKE_PUBBEES':
      return Object.assign({}, state, {pubbees: action.pubbees});
    case 'GET_PUBBEES_START':
      return Object.assign({}, state, {isGetting: true});
    case 'GET_PUBBEES_DONE':
      return Object.assign({}, state, {pubbees: action.pubbees});
    case 'NEW_NOTIFI_DONE':
      return Object.assign({}, state, {pubbees: [...state.pubbees, action.topic]});
    default:
      return state;
  }
}

const addPubbeeReducer = (state = {
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
  getPubbeesReducer,
  addPubbeeReducer
})

export default topicReducer
