import {combineReducers } from 'redux'

const notifisFetchReducer = (state = {
  isFeteching: false,
  notifis: []
}, action) => {
  switch (action.type) {
    case 'GET_FAKE_NOTIFIS':
      return Object.assign({}, state, {notifis: action.notifis});
    case 'REQUEST_NOTIFIS':
      return Object.assign({}, state, {isFeteching: true});
    case 'RECEIVE_NOTIFIS':
      return Object.assign({}, state, {notifis: action.notifis});
    case 'NEW_NOTIFI_DONE':
      return Object.assign({}, state, {notifis: [...state.notifis, action.notifi]});
    default:
      return state;
  }
}

const notifiNewReducer = (state = {
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

const notifiReducer = combineReducers({
  notifisFetchReducer,
  notifiNewReducer
})

export default notifiReducer
