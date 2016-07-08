const notifi = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text
      }
    default:
      return state
  }  
}

const notifis = (state = 'nothing', action) => {
  switch (action.type) {
    case 'GET_ALL_NOTIFIS':
      return action.notifis;
    default:
      return state;
  }
}

export default notifis
