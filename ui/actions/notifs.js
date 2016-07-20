export const REQUEST_NOTIFIS = "REQUEST_NOTIFIS";
export const RECEIVE_NOTIFIS = "RECEIVE_NOTIFIS";
export const NEW_NOTIFI_DONE = "NEW_NOTIFI_DONE";

export const getAllNotifis = () => {
  return {
    type: 'GET_FAKE_NOTIFIS',
    notifis:  [
      {id: 1, topic: 'sun set'},
      {id: 2, topic: 'bird fly'},
      {id: 3, topic: 'dog feeded'}
    ]
  }
}

function requestNotifis(searchWord) {
  return {
    type: REQUEST_NOTIFIS,
    searchWord
  };
}

function receiveNotifis(searchWord, notifis) {
  return {
    type: RECEIVE_NOTIFIS,
    searchWord,
    notifis: notifis
  };
}

export function addNotifiDone(topic) {
  return {
    type: NEW_NOTIFI_DONE,
    topic
  };
}

export function fetchNotifis(searchWord) {
  return dispatch => {
    dispatch(requestNotifis(searchWord));
    return $.post("/notifi/fetch", function(res, status) {
      console.log(res.data);
      dispatch(receiveNotifis(searchWord, res.data));
    });
  }
}
