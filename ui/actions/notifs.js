export const REQUEST_NOTIFIS = "REQUEST_NOTIFIS";
export const RECEIVE_NOTIFIS = "RECEIVE_NOTIFIS";
export const NEW_NOTIFI_DONE = "NEW_NOTIFI_DONE";
export const NEW_NOTIFI_START = "NEW_NOTIFI_START";

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

function requestNotifis(username, searchWord) {
  return {
    type: REQUEST_NOTIFIS,
    username,
    searchWord
  };
}

function receiveNotifis(username, searchWord, notifis) {
  return {
    type: RECEIVE_NOTIFIS,
    username,
    searchWord,
    notifis: notifis
  };
}

export function addNotifiDone(notifi) {
  return {
    type: NEW_NOTIFI_DONE,
    notifi
  };
}

export function fetchNotifis(username, searchWord) {
  return dispatch => {
    dispatch(requestNotifis(username, searchWord));
    return $.post("/notifi/fetch",
      {
        username: username,
        searchWord: searchWord
      },
      function(res, status) {
        //console.log(res.data);
        dispatch(receiveNotifis(username, searchWord, res.data));
      }
    );
  }
}

function newNotifiStart(topic) {
  return {
    type: NEW_NOTIFI_START,
    topic
  }
}

export function newNotifi(userId, topic) {
  return dispatch => {
    dispatch(newNotifiStart(topic));
    return $.post("/notifi/new",
      {
        userId: userId,
        topic: topic
      },
      function(res, status) {
        //console.log(res);
        dispatch(addNotifiDone(res.data.notifi));
      });
  }
}
