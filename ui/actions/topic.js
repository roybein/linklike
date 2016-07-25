export const REQUEST_NOTIFIS = "REQUEST_NOTIFIS";
export const RECEIVE_NOTIFIS = "RECEIVE_NOTIFIS";
export const NEW_NOTIFI_DONE = "NEW_NOTIFI_DONE";
export const NEW_NOTIFI_START = "NEW_NOTIFI_START";

export const getAllTopics = () => {
  return {
    type: 'GET_FAKE_NOTIFIS',
    topics:  [
      {id: 1, topic: 'sun set'},
      {id: 2, topic: 'bird fly'},
      {id: 3, topic: 'dog feeded'}
    ]
  }
}

function requestTopics(username, searchWord) {
  return {
    type: REQUEST_NOTIFIS,
    username,
    searchWord
  };
}

function receiveTopics(username, searchWord, topics) {
  return {
    type: RECEIVE_NOTIFIS,
    username,
    searchWord,
    topics: topics
  };
}

export function addTopicDone(topic) {
  return {
    type: NEW_NOTIFI_DONE,
    topic
  };
}

export function fetchTopics(username, searchWord) {
  return dispatch => {
    dispatch(requestTopics(username, searchWord));
    return $.post("/topic/fetch",
      {
        username: username,
        searchWord: searchWord
      },
      function(res, status) {
        //console.log(res.data);
        dispatch(receiveTopics(username, searchWord, res.data));
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

export function newTopic(userId, topic) {
  return dispatch => {
    dispatch(newTopicStart(topic));
    return $.post("/topic/new",
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
