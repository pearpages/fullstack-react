const ProductList = React.createClass({
    getInitialState: function () {
        return {
            products: [],
            sort: 'Up'
        };
    },
    sortData: function (direction) {
        if (direction === 'Up') {
            return Data.sort((a, b) => {
                return b.votes - a.votes;
            });
        }
        return Data.sort((a, b) => {
            return a.votes - b.votes;
        });
    },
    componentDidMount: function () {
        // Data is a global variable in the data.js file
        this.updateState();
    },
    updateState: function (direction = 'Up') {
        const products = this.sortData(direction);
        this.setState({ products: products, sort: direction });
    },
    handleProductVote: function (type, productId) {
        Data.forEach((product) => {
            if (product.id === productId) {
                const value = (type === 'up') ? 1 : -1;
                product.votes = product.votes + value;
                return;
            }
        });
        this.updateState();
    },
    toggleSort: function () {
        const direction = (this.state.sort === 'Up') ? 'Down' : 'Up' ;
        this.updateState(direction);
    },
    render: function () {
        const products = this.state.products.map((product) => {
            return (
                <Product
                    key={product.id} // react asks for a unique key
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    url={product.url}
                    votes={product.votes}
                    submitter_avatar_url={product.submitter_avatar_url}
                    product_image_url={product.product_image_url}
                    onVote={this.handleProductVote}
                />
            );
        });
        return (
            <div className="ui items">
                <div>Sort direction: <button onClick={this.toggleSort} className='ui button'>{this.state.sort}</button></div>
                {products}
            </div>
        );
    }
});

const Product = React.createClass({
    handleVoteUp: function () {
        this.props.onVote('up', this.props.id);
    },
    handleVoteDown: function (type) {
        this.props.onVote('down', this.props.id);
    },
    render: function () {
        return (
            <div className='item'>
                <div className='image'>
                    <img src={this.props.product_image_url} />
                </div>
                <div className='middle aligned content'>
                    <div className='header'>
                        <a onClick={this.handleVoteUp}>
                            <i className='large caret up icon'></i>
                        </a>
                        <a onClick={this.handleVoteDown}>
                            <i className='large caret down icon'></i>
                        </a>
                        {this.props.votes}
                    </div>
                    <div className='description'>
                        <a href={this.props.url}>{this.props.title}</a>
                        <p>{this.props.description}</p>
                    </div>
                    <div className='extra'>
                        <span>Submitted by: </span>
                        <img className='ui avatar image' src={this.props.submitter_avatar_url} />
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