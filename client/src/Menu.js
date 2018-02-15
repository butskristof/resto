import React from 'react';
import Product from './Product';

class Menu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			products: this.props.products,
			categories: this.props.categories,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			products: nextProps.products,
			categories: nextProps.categories,
		});
	}

	render() {
		let mappedProducts = Object.keys(this.state.products).map((key) => {
			let product = this.state.products[key];
			console.log(product);
			let category = this.state.categories[product.category];

			let style = "menuButton btn btn-primary";
			if (category) {
				console.log(category.style);
				style = category.style;
			}

			console.log(style);

			return (
				<Product
					name={product.name}
					price={product.price}
					id={key}
					key={key}
					styles={style}
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