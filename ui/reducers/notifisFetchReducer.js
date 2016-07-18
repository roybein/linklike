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

export default notifisFetchReducer
