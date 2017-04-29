function reducer(state,action) {
    if (action.type === 'INCREMENT') {
        return state + action.amount;
    } else if (action.type === 'DECREMENT') {
        return state - action.amount;
    } else {
        return state;
    }
}

function createStore(reducer) {

    let state = 0;

    return {
        getState,
        dispatch
    }

    function getState() {
        return state;
    }

    function dispatch(action) {
        state = reducer(state,action);
    }
}

const store = createStore(reducer);

const incrementAction = { type: 'INCREMENT', amount: 1 };
const decrementAction = { type: 'DECREMENT', amount: 1 };

store.dispatch(incrementAction);
store.dispatch(incrementAction);
store.dispatch(incrementAction);
store.dispatch(decrementAction);
store.dispatch(decrementAction);
store.dispatch(incrementAction);
store.dispatch(incrementAction);
store.dispatch(decrementAction);
store.dispatch(incrementAction);
console.log(store.getState());