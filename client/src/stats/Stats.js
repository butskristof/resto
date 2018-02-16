import React from 'react';
import axios from 'axios';

import Order from './Order';

class Stats extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			products: {},
			orders: {},
		};
	}

	calculateProductTotals() {
		let products = this.state.products;
		let orders = this.state.orders;
		for (let i = 0; i < orders.length; ++i) {
			for (let j = 0; j < orders[i].products.length; ++j) {
				let productid = orders[i].products[j].product;
				if (products[productid]) {
					if (products[productid]["sold"] == null) {

						products[productid]["sold"] = orders[i].products[j].quantity;
					} else {
						products[productid]["sold"] = products[productid]["sold"] + orders[i].products[j].quantity;
					}
				}
			}
		}

		this.setState({
			products: products,
		});
	}

	componentDidMount() {
		axios
			.get('/api/products')
			.then((response) => {
				let prod = {};
				for (let i = 0; i < response.data.length; ++i) {
					prod[response.data[i]._id] = response.data[i];
				}

				this.setState({
					products: prod,
				});
			});

		axios.get('/api/orders?count=1000')
			.then((response) => {
				// console.log(response.data);
				// let categories = {};
				// for (let i = 0; i < response.data.length; ++i) {
				// 	categories[response.data[i]._id] = response.data[i];
				// }
				// console.log(categories)
				//
				// console.log(response.data);
				this.setState({
					orders: response.data,
				}, this.calculateProductTotals);
			});

		// this.calculateProductTotals();
	}

	render() {

		// let orders = Object.keys(this.state.orders).map((key) => {
		// 	return(
		// 		<Order key={key} products={this.state.products} order={this.state.orders[key]} />
		// 	);
		// });

		// let products = "";
		let products = Object.keys(this.state.products).map((key) => {
			return(
				<li key={key}>
					{this.state.products[key].name} - Verkocht: {this.state.products[key]["sold"]}
				</li>
			);
		});

		// this.calculateProductTotals();

		return(
			<div>
				<h2>Statistieken</h2>
				{/*{orders}*/}
				<ul>
					{products}
				</ul>
			</div>
		);
	}
}

export default Stats;
