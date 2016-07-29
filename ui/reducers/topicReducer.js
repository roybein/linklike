import {combineReducers } from 'redux'

const getPubbeesReducer = (state = {
  isGetPubbees: false,
  pubbees: []
}, action) => {
  switch (action.type) {
    case 'GET_FAKE_PUBBEES':
      return Object.assign({}, state, {pubbees: action.pubbees});
    case 'GET_PUBBEES_START':
      return Object.assign({}, state, {isGetPubbees: true});
    case 'GET_PUBBEES_DONE':
      return Object.assign({}, state, {pubbees: action.pubbees});
    case 'ADD_PUBBEE_DONE':
      return Object.assign({}, state, {pubbees: [...state.pubbees, action.topic]});
    default:
      return state;
  }
}

const addPubbeeReducer = (state = {
  isAdding: false,
  pubbeeToAdd: ""
}, action) => {
  switch (action.type) {
    case 'ADD_PUBBEE_START':
      return Object.assign({}, state, {isAdding: true});
    case 'ADD_PUBBEE_DONE':
      return Object.assign({}, state, {pubbeeToAdd: ""});
    default:
      return state;
  }
}

const getSubbeesReducer = (state = {
  isGetSubbees: false,
  subbees: []
}, action) => {
  switch (action.type) {
    case 'GET_FAKE_SUBBEES':
      return Object.assign({}, state, {subbees: action.subbees});
    case 'GET_SUBBEES_START':
      return Object.assign({}, state, {isGetSubbees: true});
    case 'GET_SUBBEES_DONE':
      return Object.assign({}, state, {subbees: action.subbees});
    case 'ADD_SUBBEE_DONE':
      return Object.assign({}, state, {subbees: [...state.subbees, action.topic]});
    default:
      return state;
  }
}

const topicReducer = combineReducers({
  getPubbeesReducer,
  addPubbeeReducer,
  getSubbeesReducer
})

export default topicReducer
