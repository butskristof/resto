import React from 'react';
import axios from 'axios';

import Order from './Order';

class Stats extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			products: {},
			orders: {},
			totalincome: 0,
		};
	}

	calculateProductTotals() {
		let products = this.state.products;
		let orders = this.state.orders;
		let totalincome = 0;

		for (let i = 0; i < orders.length; ++i) {
			if (orders[i].leiding !== true && orders[i].helper !== true) {
				totalincome = totalincome + orders[i].total_price;
			}
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

		for (let p in products) {
			// console.log(products[p].price);
			// totalincome = totalincome + (products[p].price * products[p].sold);
		}

		console.log(totalincome);

		this.setState({
			products: products,
			totalincome: totalincome,
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
				this.setState({
					orders: response.data,
				}, this.calculateProductTotals);
			});
	}

	render() {

		let orders = Object.keys(this.state.orders).map((key) => {
			return(
				<Order key={key} products={this.state.products} order={this.state.orders[key]} />
			);
		});

		let products = Object.keys(this.state.products).map((key) => {
			return(
				<li key={key}>
					{this.state.products[key].name} - Verkocht: {this.state.products[key]["sold"]}
				</li>
			);
		});

		return(
			<div>
				<h2>Statistieken</h2>
				{orders}
				<ul>
					{products}
				</ul>
			</div>
		);
	}
}

export default Stats;
