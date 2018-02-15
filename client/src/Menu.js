import React from 'react';
import Product from './Product';

class Menu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			products: this.props.products,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			products: nextProps.products,
		});
	}

	render() {
		let mappedProducts = Object.keys(this.state.products).map((key) => {
			let product = this.state.products[key];
			return (
				<Product
					name={product.name}
					price={product.price}
					id={key}
					key={key}
					onClick={() => this.props.addToOrder(key)}
				/>
			);
		});

		return (
			<div>
				<h2>Menu</h2>
				<div>
					{mappedProducts}
				</div>
			</div>
		);
	}
}

export default Menu;