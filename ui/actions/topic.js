export const GET_PUBBEES_START = "GET_PUBBEES_START";
export const GET_PUBBEES_DONE = "GET_PUBBEES_DONE";
export const NEW_NOTIFI_DONE = "NEW_NOTIFI_DONE";
export const NEW_NOTIFI_START = "NEW_NOTIFI_START";

export const getFakePubbees = () => {
  return {
    type: 'GET_FAKE_PUBBEES',
    pubbees:  [
      {id: 1, topic: 'sun set'},
      {id: 2, topic: 'bird fly'},
      {id: 3, topic: 'dog feeded'}
    ]
  }
}

function getPubbeesStart(username, searchWord) {
  return {
    type: GET_PUBBEES_START,
    username,
    searchWord
  };
}

function getPubbeesDone(username, searchWord, pubbees) {
  return {
    type: GET_PUBBEES_DONE,
    username,
    searchWord,
    pubbees: pubbees
  };
}

export function addTopicDone(topic) {
  return {
    type: NEW_NOTIFI_DONE,
    topic
  };
}

export function getPubbees(username, searchWord) {
  return dispatch => {
    dispatch(getPubbeesStart(username, searchWord));
    return $.post("/user/getPubbees",
      {
        username: username,
        searchWord: searchWord
      },
      function(res, status) {
        //console.log(res.data);
        dispatch(getPubbeesDone(username, searchWord, res.data));
      }
    );
  }
}

function newTopicStart(topic) {
  return {
    type: NEW_NOTIFI_START,
    topic
  }
}

export function addPubbee(userId, topic) {
  return dispatch => {
    dispatch(newTopicStart(topic));
    return $.post("/user/addPubbee",
      {
        userId: userId,
        topic: topic
      },
      function(res, status) {
        //console.log(res);
        dispatch(addTopicDone(res.data.topic));
      });
  }
}
