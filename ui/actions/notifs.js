let nextNotifi = 0;

export const getAllNotifis = () => {
  return {
    type: 'GET_ALL_NOTIFIS',
    notifis:  [
      {id: 1, text: 'sun set'},
      {id: 2, text: 'bird fly'},
      {id: 3, text: 'dog feeded'}
    ]
  }
}

export const addNotifi = (text) => {
  return {
    type: 'ADD_NOTIFI',
    id: nextNotifi++,
    text
  };
};
