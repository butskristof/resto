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
			order: {},
			totalprice: 0,
			cashin: 0,
			change: 0,
			discount: "none",
		};

		this.updateChange = this.updateChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.updateDiscount = this.updateDiscount.bind(this);
		this.clear = this.clear.bind(this);
	}

	updateTotalPrice(id) {
		if ( this.state.discount !== 'leiding' && this.state.discount !== 'helper' ) {
		}
	}

	addProduct(id) {
		// console.log("Add " + id);
		let newOrder = this.state.order;
		if (newOrder[id] == null) {
			newOrder[id] = 1;
		} else {
			++newOrder[id];
		}

		let newtotalprice = this.state.totalprice + this.state.products[id].price;

		this.setState({
			order: newOrder,
			totalprice: newtotalprice,
		});
	}

	removeProduct(id) {
		let newOrder = this.state.order;
		if (newOrder[id] != null) {
			--newOrder[id];
			if (newOrder[id] === 0) {
				delete newOrder[id];
			}
		}

		let newtotalprice = this.state.totalprice - this.state.products[id].price;

		this.setState({
			order: newOrder,
			totalprice: newtotalprice,
		});
	}

	updateChange(event) {
		let cashin= 0;
		if (event.target.value !== "") {
			cashin = parseFloat(event.target.value);
		}

		this.setState({
			cashin: cashin,
		});

		let diff = cashin - this.state.totalprice;
		this.setState({
			change: diff,
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
			// console.log(key + " - " + this.state.order[key]);
			orderlines.push({product: key, quantity: this.state.order[key]});
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
		return(
			<main>
				<div className={'row'}>
					<div className={'col-sm'}>
						<Menu
							products={this.state.products}
							addToOrder={(id) => this.addProduct(id)}
						/>
					</div>
					<div className={'col-sm'}>
						<Order
							order={this.state.order}
							products={this.state.products}
							add={(id) => this.addProduct(id)}
							remove={(id) => this.removeProduct(id)}
							/>

						<div className={'discount'}>
							<RadioGroup
								name={"discount"}
								selectedValue={this.state.discount}
								onChange={this.updateDiscount}
								>
								<Radio value={"none"} />Geen
								<Radio value={"leiding"} />Leiding
								<Radio value={"helper"} />Helper
							</RadioGroup>
						</div>

						<p><strong>Totaal te ontvangen:</strong>
							<Currency
								quantity={this.state.totalprice}
								currency="EUR"
							/>
						</p>

						<p>Cash gekregen:
							<input type="text" onChange={this.updateChange} value={this.state.cashin} />
						</p>
						<p><strong>Terug te geven: </strong> <Currency quantity={this.state.change} currency={"EUR"} /></p>

						<button
							className={'btn btn-primary'}
							onClick={this.onSubmit}
						>
							Bestellen
						</button>
						<button
							className={'btn btn-secondary'}
							onClick={this.clear}
						>
							Clear
						</button>
					</div>
				</div>
			</main>
		);
	}
}

export default Resto;
