# Forms

## Resources

+ https://facebook.github.io/react/docs/events.html

## Events and Event Handlers

This event object is a *SyntheticEvent*. This SyntheticEvent is just a cross-browser **wrapper** around the browser’s native MouseEvent, and you’ll be able to use it the same way you would a native DOM event. In addition, if you need the original native event you can access it via the nativeEvent attribute (e.g. evt.nativeEvent).

```js
const Buttons = React.createClass({

  onButtonClick(evt) {
    const btn = evt.target;
    console.log(`The user clicked ${btn.name}: ${btn.value}`);
  },

  render() {
    return (
      <div>
        <h1>What do you think of React?</h1>

        <button
          name='button-1'
          value='great'
          onClick={this.onButtonClick}
        >
          Great
        </button>

        <button
          name='button-2'
          value='amazing'
          onClick={this.onButtonClick}
        >
          Amazing
        </button>
      </div>
    );
  },
});
```

### Text Input

In React, if we want to easily access a DOM element in a component we can use refs (references).

```js
const SignUp = React.createClass({

  getInitialState() {
    return { names: [] };
  },

  onFormSubmit(evt) {
    const name = this.refs.name.value;
    const names = [ ...this.state.names, name ];
    this.setState({ names: names });
    this.refs.name.value = '';
    evt.preventDefault(); // <--
  },

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Name'
            ref='name'
          />

          <input type='submit' />
        </form>

        <div>
          <h3>Names</h3>
          <ul>
          { /* React will complain when we have children in an array or iterator (like we do here) and they don’t have a key prop. */ }
            { this.state.names.map((name, i) => <li key={i}>{name}</li>) }
          </ul>
        </div>
      </div>
    );
  },
});

```

---

## Uncontrolled vs. Controlled Components

With React we shouldn’t have to worry about modifying the DOM to match application state. We should concentrate only on altering state and rely on React’s ability to efficiently manipulate the DOM to match. This provides us with the certainty that for any given value of state, we can predict what render() will return and therefore know what our app will look like.

> By directly tying our view to our application state we get certain features for very little work.

---

## Accessing User Input With state

+ First, we need a place in state to store its value.
+ Second, we provide that location in state as its value prop.
+ Finally, we add an onChange handler that will update its value in state.

The flow for a controlled component looks like this:

1. The user enters/changes the input.
2. The onChange handler is called with the “change” event.
3. Using *event.target.value* we update the input element’s value in state.
4. render() is called and the input is updated with the new value in state.

```js
onNameChange(evt) {
  this.setState({ name: evt.target.value });
},
onFormSubmit(evt) {
  const names = [ ...this.state.names, this.state.name ];
  this.setState({ names: names, name: '' });
  evt.preventDefault();
},
render() {
  return (
    <div>
      <h1>Sign Up Sheet</h1>

      <form onSubmit={this.onFormSubmit}>
        <input
          placeholder='Name'
          value={this.state.name}
          onChange={this.onNameChange}
        />

        <input type='submit' />
      </form>

      <div>
        <h3>Names</h3>
        <ul>
          { this.state.names.map( (name, i) => <li key={i}>{name}</li>)}
        </ul>
      </div>
    </div>
  );
}
```

Now that the input is “controlled”, its value will always be set equal to a property of our state. In this case, that property is name, so the value of the input is this.state.name.

---

## Multiple Fields

Instead of creating an onChange handler for each input, we can create a single method that accepts change events from all of our inputs. The trick is to write this method in such a way that it updates the correct property in state depending on the input field that triggered the event.

```js
const Foo = React.createClass({
    onInputChange: function (evt) {
        this.props.onInputChange(evt);
    },
    onFormSubmit: function (evt) {
        this.props.onFormSubmit(evt);
    },
    render() {
        return (
            <div>
                <h1>Sign Up Sheet</h1>

                <form onSubmit={this.onFormSubmit}>
                    <input
                        placeholder='Name'
                        name='name'
                        value={this.props.data.fields.name}
                        onChange={this.onInputChange}
                    />

                    <input
                        placeholder='Email'
                        name='email'
                        value={this.props.data.fields.email}
                        onChange={this.onInputChange}
                    />

                    <input type="submit"/>
                </form>

                <div>
                    <h3>People</h3>
                    <ul>
                        {this.props.data.people.map( ({name,email}, i ) =>
                            <li key={i}>{name} ({email})</li>
                         )}
                    </ul>
                </div>
            </div>
        );
    }
});

const Container = React.createClass({
    getInitialState() {
        return {
            fields: {
                email: '',
                name: ''
            },
            people: []
        }
    },
    handleInputChange: function (evt) {
        const target = evt.target
        const fields = this.state.fields;
        fields[target.name] = target.value;
        this.setState({fields});
    },
    handleFormSubmit: function (evt) {
        const people = [...this.state.people,this.state.fields];
        this.setState({people: people, fields: {email: '', name: ''}});
        evt.preventDefault();
    },
    render () {
        return (
            <Foo onInputChange={this.handleInputChange} onFormSubmit={this.handleFormSubmit} data={this.state}/>
        );
    }
});

ReactDOM.render(
    <Container />,
    document.getElementById('content')
);
```

---

## Validation

```js
const Container = React.createClass({
    getInitialState() {
        return {
            fields: {
                email: '',
                name: ''
            },
            fieldErrors: {},
            people: []
        }
    },
    handleInputChange: function (evt) {
        const target = evt.target
        const fields = this.state.fields;
        fields[target.name] = target.value;
        this.setState({ fields });
    },
    handleFormSubmit: function (evt) {
        const person = this.state.fields;
        const fieldErrors = this.validate(person);

        evt.preventDefault();

        this.setState({ fieldErrors });

        if (Object.keys(fieldErrors).length) {
            return;
        } else {
            const people = [...this.state.people, this.state.fields];
            this.setState({ people: people, fields: { email: '', name: '' } });
        }
    },
    validate(person) {
        const errors = {};
        if (!person.name) {
            errors.name = 'Name Required';
        }
        if (!person.email) {
            errors.email = 'Email Required';
        }
        if (person.email && !this.isEmail(person.email)) {
            errors.email = 'Invalid Email';
        }
        return errors;
    },
    isEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    render() {
        return (
            <Foo onInputChange={this.handleInputChange} onFormSubmit={this.handleFormSubmit} data={this.state} />
        );
    }
});

const Foo = React.createClass({
    onInputChange: function (evt) {
        this.props.onInputChange(evt);
    },
    onFormSubmit: function (evt) {
        this.props.onFormSubmit(evt);
    },
    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <input
                        placeholder='Name'
                        name='name'
                        value={this.props.data.fields.name}
                        onChange={this.onInputChange}
                    />

                    <span style={{ color: 'red' }}>{this.props.data.fieldErrors.name}</span>

                    <br />

                    <input
                        placeholder='Email'
                        name='email'
                        value={this.props.data.fields.email}
                        onChange={this.onInputChange}
                    />

                    <span style={{ color: 'red' }}>{this.props.data.fieldErrors.email}</span>

                    <br />

                    <input type="submit" />
                </form>

                <div>
                    <h3>People</h3>
                    <ul>
                        {this.props.data.people.map(({ name, email }, i) =>
                            <li key={i}>{name} ({email})</li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <Container />,
    document.getElementById('content')
);
```

---

## Creating the Field Component

```js
function isEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
}

const Container = React.createClass({
    getInitialState() {
        return {
            fields: {
                email: '',
                name: ''
            },
            fieldsErrors: {},
            people: []
        }
    },
    handleInputChange: function (evt) {
        const fields = this.state.fields;
        const fieldsErrors = this.state.fieldsErrors;
        fields[evt.name] = evt.value;
        fieldsErrors[name] = evt.error;
        this.setState({ fields, fieldsErrors });
    },
    handleFormSubmit: function (evt) {
        const people = this.state.people;
        const person = this.state.fields;

        evt.preventDefault();

        if(this.validate()) return;

        people.push(person);
        this.setState({people, fields: {}});
    },
    validate() {
        const person = this.state.fields;
        const fieldsErrors = this.state.fieldsErrors;
        const errMessages = Object.keys(fieldsErrors).filter( (k) => fieldsErrors[k]);

        if(!person.name) return true;
        if(!person.email) return true;
        if(errMessages.length) return true;

        return false;
    },
    render() {
        return (
            <Foo validate={this.validate} onInputChange={this.handleInputChange} onFormSubmit={this.handleFormSubmit} data={this.state} />
        );
    }
});

const Foo = React.createClass({
    onInputChange: function (evt) {
        this.props.onInputChange(evt);
    },
    onFormSubmit: function (evt) {
        this.props.onFormSubmit(evt);
    },
    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>

                    <Field
                        placeholder='Name'
                        name='name'
                        value={this.props.data.fields.name}
                        onChange={this.onInputChange}
                        validate={(val) => (val ? false: 'Name Required')}
                    />

                    <br />

                    <Field
                        placeholder='Email'
                        name='email'
                        value={this.props.data.fields.email}
                        onChange={this.onInputChange}
                        validate={(val) => (isEmail(val) ? false: 'Invalid Email')}
                    />

                    <br />

                    <input type="submit" disabled={this.props.validate()}/>
                </form>

                <div>
                    <h3>People</h3>
                    <ul>
                        {this.props.data.people.map(({ name, email }, i) =>
                            <li key={i}>{name} ({email})</li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
});

const Field =  React.createClass({
    propTypes: {
        placeholder: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.string,
        validate: React.PropTypes.func,
        onChange: React.PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            value: this.props.value,
            error: false
        }
    },
    componentsWillReceiveProps(udpate) {
        this.setState({value: update.value});
    },
    onChange(evt) {
        const name = this.props.name;
        const value = evt.target.value;
        const error = this.props.validate ? this.props.validate(value) : false;

        this.setState({value,error});

        this.props.onChange({name,value,error});
    },
    render() {
        return (
            <div>
                <input
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <span style={{color: 'red'}}>{this.state.error}</span>
            </div>
        )
    }
});

ReactDOM.render(
    <Container />,
    document.getElementById('content')
);
```