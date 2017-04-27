import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.onItemChange = this.onItemChange.bind(this);
    this.addItem = this.addItem.bind(this);

    this.state = {
      items: [],
      item: ''
    };

  }

  addItem(e) {
    e.preventDefault();

    this.setState({
      items: this.state.items.concat(this.state.item),
      item: ''
    })
  }

  onItemChange(e) {
    this.setState({ item: e.target.value });
  }

  render() {
    const submitDisabled = this.state.item === '';
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <form
          className='ui form'
          onSubmit={this.addItem}
        >
          <div className='field'>
            <input
              className='prompt'
              type='text'
              placeholder='Add item...'
              value={this.state.item}
              onChange={this.onItemChange}
            />
          </div>
          <button
            className='ui button'
            type='submit'
            disabled={submitDisabled}
          >
            Add item
          </button>
        </form>

        <br/>

        <table style={{margin:'auto'}}>
          <thead>
            <tr><th>Items</th></tr>
          </thead>
          <tbody>
            {
              this.state.items.map((item, idx) => (
                <tr
                  key={idx}
                >
                  <td>{item}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
