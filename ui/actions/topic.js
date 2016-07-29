export const GET_PUBBEES_START = "GET_PUBBEES_START";
export const GET_PUBBEES_DONE = "GET_PUBBEES_DONE";
export const ADD_PUBBEE_DONE = "ADD_PUBBEE_DONE";
export const ADD_PUBBEE_START = "ADD_PUBBEE_START";
export const GET_SUBBEES_START = "GET_SUBBEES_START";
export const GET_SUBBEES_DONE = "GET_SUBBEES_DONE";

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

function addPubbeeStart(topic) {
  return {
    type: ADD_PUBBEE_START,
    topic
  }
}

function addPubbeeDone(topic) {
  return {
    type: ADD_PUBBEE_DONE,
    topic
  };
}

export function addPubbee(userId, topic) {
  return dispatch => {
    dispatch(addPubbeeStart(topic));
    return $.post("/user/addPubbee",
      {
        userId: userId,
        topic: topic
      },
      function(res, status) {
        //console.log(res);
        dispatch(addPubbeeDone(res.data.topic));
      });
  }
}

function getSubbeesStart(username, searchWord) {
  return {
    type: GET_SUBBEES_START,
    username,
    searchWord
  };
}

function getSubbeesDone(username, searchWord, subbees) {
  return {
    type: GET_SUBBEES_DONE,
    username,
    searchWord,
    subbees: subbees
  };
}

export function getSubbees(username, searchWord) {
  return dispatch => {
    dispatch(getSubbeesStart(username, searchWord));
    return $.post("/user/getSubbees",
      {
        username: username,
        searchWord: searchWord
      },
      function(res, status) {
        //console.log(res.data);
        dispatch(getSubbeesDone(username, searchWord, res.data));
      }
    );
  }
}
