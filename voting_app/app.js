const ProductList = React.createClass({
    render: function () {
        return (
            <div className="ui items">
                <Product />
            </div>
        );
    }
});

const Product = React.createClass({
    render: function () {
        return (
            <div className='item'>
                <div className='image'>
                    <img src="images/products/default.png" alt="default"/>
                </div>
                <div className='middle aligned content'>
                    <div className='midle aligned content'>
                        <div className='description'>
                            <a>For Knight</a>
                            <p>Authentic renaissance actors, delivered in just two weeks.</p>
                        </div>
                        <div className='extra'>
                            <span>Submitted by: </span>
                            <img className='ui avatar image' src="images/avatars/avatar.png" alt="avatar"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


ReactDOM.render(
    <ProductList />,
    document.getElementById('content')
);