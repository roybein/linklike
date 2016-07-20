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
      console.log(state);
      var s = Object.assign({}, state, {notifis: [...state.notifis, {id:4, topic: "test_topic_new"}]});
      console.log(s);
      return s;
    default:
      return state;
  }
}

const notifiNewDone = (state, action) => {
  switch (action.type) {
    case 'NEW_NOTIFI_DONE':
      console.log("notifiNewDone action.topic", action.topic);
      return action.topic
    default: 
      return state;
  }
}

const notifiNewReducer = (state = {
  isAdding: false,
  topic: ""
}, action) => {
  switch (action.type) {
    case 'NEW_NOTIFI_DONE':
      console.log(state);
      return {isAdding: false, topic: ""};
    default:
      return state;
  }
}
    

const notifiReducer = combineReducers({
  notifisFetchReducer,
  notifiNewReducer
})

export default notifiReducer
