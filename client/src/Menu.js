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

	chooseToppings(product, chosenToppings) {
		// console.log(`We'll choose a topping for ${product.name}`);

		this.props.addToOrder(product, chosenToppings);
	}

	render() {
		let mappedProducts = Object.keys(this.state.products).map((key) => {
			let product = this.state.products[key];
			let category = this.state.categories[product.category];

			let style = "menuButton btn btn-primary";
			if (category) {
				style = category.style;
			}

			return (
				<Product
					name={product.name}
					toppings={product.toppings}
					price={product.price}
					id={key}
					key={key}
					styles={style}
					chooseToppings={(toppings) => this.chooseToppings(product, toppings)}
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