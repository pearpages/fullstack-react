function createStore(reducer, initialState) {

  let state = initialState; // messages
  const listeners = [];

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((l) => l());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  return {
    getState,
    dispatch,
    subscribe
  };
}

function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    return {
      messages: state.messages.concat(action.message),
    };
  } else if (action.type === 'DELETE_MESSAGE') {
    return {
      messages: [
        ...state.messages.slice(0, action.index),
        ...state.messages.slice(action.index + 1, state.messages.length)
      ]
    };
  } else {
    return state;
  }
}

const store = createStore(reducer, { messages: [] });
store.subscribe(() => console.log(store.getState()));

const action1 = {
  type: 'ADD_MESSAGE',
  message: 'Hello John'
};

const action2 = {
  type: 'ADD_MESSAGE',
  message: 'Hello Pere'
};

const action3 = {
  type: 'DELETE_MESSAGE',
  index: 1
};

store.dispatch(action1);
store.dispatch(action2);
store.dispatch(action3);
