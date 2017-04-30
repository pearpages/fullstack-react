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

const MessageInput = React.createClass({
    handleSubmit: function () {
        store.dispatch({
            type: 'ADD_MESSAGE',
            message: this.refs.messageInput.value,
        });
        this.refs.messageInput.value = '';
    },
    render: function () {
        return (
            <div className='ui input'>
                <input
                    ref='messageInput'
                    type='text'
                >
                </input>
                <button
                    onClick={this.handleSubmit} className='ui primary button' type='submit'
                >
                    Submit
        </button>
            </div>
        );
    },
});


const MessageView = React.createClass({
    handleClick: function (index) {
        store.dispatch({
            type: 'DELETE_MESSAGE',
            index: index,
        });
    },
    render: function () {
        const messages = this.props.messages.map((message, index) => (
            <div
                className='comment'
                key={index}
                onClick={() => this.handleClick(index)}
            >
            {message}
            </div>));
        return (
            <div className='ui comments'>
                {messages}
            </div>);
    },
});


const App = React.createClass({
    componentDidMount: function () {
        store.subscribe(() => this.forceUpdate());
    },
    render: function () {
        const messages = store.getState().messages;
        return (
            <div className='ui segment'>
                <MessageView messages={messages} />
                <MessageInput />
            </div>
        );
    },
});

ReactDOM.render(
    <App />,
    document.getElementById('content'));