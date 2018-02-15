import React from 'react';
import Currency from 'react-currency-formatter';

class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			price: this.props.price,
			id: this.props.id,
		};

	}

	render() {


		return (
			<button
				className={"btn " + this.props.styles}
				type="button"
				onClick={() => this.props.onClick(this.state.id)}
				>
				{this.state.name} - <Currency quantity={this.state.price} currency={"EUR"} />
			</button>
		);
	}
}

export default Product;
