import React from 'react';
import axios from 'axios';
import Currency from 'react-currency-formatter';
import {RadioGroup, Radio} from 'react-radio-group';

import Menu from './Menu';
import Order from './Order';


class Resto extends React.Component {
	constructor() {
		super();
		this.state = {
			products: {},
			order: [],
			totalprice: 0,
			cashin: 0,
			change: 0,
			discount: "none",
			categories: {}
		};

		this.updateChange = this.updateChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.updateDiscount = this.updateDiscount.bind(this);
		this.clear = this.clear.bind(this);
		this.addProduct = this.addProduct.bind(this);
	}

	addProduct(product, toppings) { // productId, [toppingId]
		let newOrder = this.state.order;
		let id = product._id;
		let productname = product.name;
		let productprice = product.price;

		if (toppings == null || toppings.length === 0) {
			console.log("addProduct: no toppings");
		} else {
			toppings.forEach(topping => {
				// console.log(topping.name);
				productname += `, ${topping.name}`;
				productprice += topping.price;
				id += `-${topping._id}`;
			});
		}

		let newTotalPrice = this.state.totalprice + productprice;

		if (newOrder[id] == null) {
			newOrder[id] = {
				quantity: 1,
				price: productprice,
				name: productname
			};
		} else {
			++(newOrder[id].quantity);
		}

		this.setState({
			order: newOrder,
			totalprice: newTotalPrice,
		}, this.calculateChange);
	}

	increaseQuantity(id) {
		let newOrder = this.state.order;

		if (newOrder[id] != null) {
			++(newOrder[id].quantity);
		}

		let newTotalPrice = this.state.totalprice + this.state.order[id].price;

		this.setState({
			order: newOrder,
			totalprice: newTotalPrice,
		}, this.calculateChange);
	}

	decreaseQuantity(id) {
		let newOrder = this.state.order;
		let newtotalprice = this.state.totalprice - this.state.order[id].price;

		if (newOrder[id] != null) {
			--newOrder[id].quantity;
			if (newOrder[id].quantity === 0) {
				delete newOrder[id];
			}
		}

		this.setState({
			order: newOrder,
			totalprice: newtotalprice,
		}, this.calculateChange);
	}

	updateChange(event) {
		let cashin = event.target.value;

		this.setState({
			cashin: cashin,
		}, this.calculateChange);
	}

	calculateChange() {
		let cashin = parseFloat(this.state.cashin);
		if (!isNaN(cashin)) {
			let diff = this.state.cashin - this.state.totalprice;
			this.setState({
				change: diff,
			});
		} else {
			this.setState({
				change: "/",
			})
		}

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

		axios.get('/api/categories')
			.then((response) => {
				let categories = {};
				for (let i = 0; i < response.data.length; ++i) {
					categories[response.data[i]._id] = response.data[i];
				}
				this.setState({
					categories: categories,
				});
			});
	}

	clear() {
		this.setState({
			order: {},
			totalprice: 0,
			cashin: 0,
			change: 0,
			discount: "none",
		});
	}

	onSubmit(event) {
		let orderlines = [];

		for (let key in this.state.order) {
			let splitKey = key.split("-");
			let productKey = splitKey[0];
			let toppingKeys;
			if (splitKey.length > 1) {
				toppingKeys = splitKey.slice(1);
			} else {
				toppingKeys = [];
			}
			orderlines.push({product: productKey, toppings: toppingKeys, quantity: this.state.order[key].quantity, fullname: this.state.order[key].name});
		}

		let totalprice = this.state.totalprice;
		let leiding = false;
		if (this.state.discount === "leiding") {
			leiding = true;
		}
		let helper = false;
		if (this.state.discount === "helper") {
			helper = true;
		}

		axios.post('/api/orders', {orderlines, totalprice, leiding, helper})
			.then((result) => {
				console.log(result);
			});


		this.clear();
	}

	updateDiscount(event) {
		this.setState({
			discount: event,
		});
	}


	render() {

		let change = isNaN(this.state.change) ? this.state.change : (<Currency quantity={this.state.change} currency={"EUR"} />);

		return(
			<main>
				<div className={'row'}>
					<div className={'col-sm'}>
						<Menu
							products={this.state.products}
							categories={this.state.categories}
							addToOrder={(productId, toppings) => this.addProduct(productId, toppings)}
						/>
					</div>
					<div className={'col-sm'}>
						<Order
							order={this.state.order}
							// products={this.state.products}
							add={(id) => this.increaseQuantity(id)}
							remove={(id) => this.decreaseQuantity(id)}
							/>

						<div className={'discount'}>
							<RadioGroup
								name={"discount"}
								selectedValue={this.state.discount}
								onChange={this.updateDiscount}
								>
								<div className={'korting'}><Radio value={"none"} id={'none'}/><label htmlFor={'none'}>Geen</label></div>
								<div className={'korting'}><Radio value={"leiding"} id={'leiding'}/><label htmlFor={'leiding'}>Leiding</label> </div>
								<div className={'korting'}><Radio value={"helper"} id={'helper'}/><label htmlFor={'helper'}>Helper</label></div>
							</RadioGroup>
						</div>

						<div className={'afrekening'}>
						<p><strong>Totaal te ontvangen:</strong>
							<span><Currency
								quantity={this.state.totalprice}
								currency="EUR"
							/></span>
						</p>

						<p><strong>Cash gekregen:</strong>
							<input type="text" onChange={this.updateChange} value={this.state.cashin} />
						</p>
						<p><strong>Terug te geven: </strong> <span>{change}</span></p>
						<button
							className={'btn btn-secondary'}
							onClick={this.clear}
						>
							Wissen
						</button>
						<button
							className={'btn btn-primary'}
							onClick={this.onSubmit}
						>
							Bestellen
						</button>

						</div>
					</div>
				</div>
			</main>
		);
	}
}

export default Resto;
