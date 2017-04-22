const ProductList = React.createClass({
    render: function () {
        return (
            <div className="ui items">
                Hello, friend! I am a basci React component.
            </div>
        );
    }
});

ReactDOM.render(
    <ProductList />,
    document.getElementById('content')
);