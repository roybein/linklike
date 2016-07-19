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
    default:
      return state;
  }
}

const notifiAdd = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFI':
      return {
        topic: action.topic
      }
    default: 
      return state;
  }
}

const notifiAddReducer = (state = {
  isAdding: false
}, action) => {
  switch (action.type) {
    case 'ADD_NOTIFI':
      return [
        ...state,
        notifiAdd(state, action)
      ]
    default:
      return state;
  }
}
    

const notifiReducer = combineReducers({
  notifisFetchReducer
})

export default notifiReducer
