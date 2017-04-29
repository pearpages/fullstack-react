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
