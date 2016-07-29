import {combineReducers } from 'redux'

const pubbeesReducer = (state = {
  isGetPubbees: false,
  pubbees: [],
  isAddPubbee: false,
  pubbeeToAdd: ""
}, action) => {
  switch (action.type) {
    case 'GET_FAKE_PUBBEES':
      return Object.assign({}, state, {pubbees: action.pubbees});
    case 'GET_PUBBEES_START':
      return Object.assign({}, state, {isGetPubbees: true});
    case 'GET_PUBBEES_DONE':
      return Object.assign({}, state, {pubbees: action.pubbees, isGetPubbees: false});
    case 'ADD_PUBBEE_START':
      return Object.assign({}, state, {isAddPubbee: true});
    case 'ADD_PUBBEE_DONE':
      return Object.assign({}, state, {pubbees: [...state.pubbees, action.topic], isAddPubbee: false, pubbeeToAdd: ""});
    default:
      return state;
  }
}

const subbeesReducer = (state = {
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
  pubbeesReducer,
  subbeesReducer
})

export default topicReducer
