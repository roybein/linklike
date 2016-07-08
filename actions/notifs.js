let nextNotifi = 0;

export const getAllNotifis = () => {
  return {
    type: 'GET_ALL_NOTIFIS',
    notifis: 'sun set'
  }
}

export const addNotifi = (text) => {
  return {
    type: 'ADD_NOTIFI',
    id: nextNotifi++,
    text
  };
};
