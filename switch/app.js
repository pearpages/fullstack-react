const CREDITCARD = 'Creditcard';
const BTC = 'Bitcoin';

const Choice = function (props) {

    return (<div
        className="choice"
        onClick={props.onClick}
    >
        <button className={props.active ? 'active' : null}>{props.label}</button>
    </div >);

};

class Switch extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            payMethod: BTC
        };
    }

    select(choice) {
        return (evt) => this.setState({ payMethod: choice })
    }

    render() {
        return (
            <div className="switch">
                <Choice
                    onClick={this.select(BTC)}
                    active={this.state.payMethod === BTC}
                    label={BTC}
                />
                <Choice
                    onClick={this.select(CREDITCARD)}
                    active={this.state.payMethod === CREDITCARD}
                    label={CREDITCARD}
                />
                <p>Pay with: {this.state.payMethod}</p>
            </div>
        );
    }
}

ReactDOM.render(
    <Switch />,
    document.getElementById('content')
);