import React from 'react';
import axios from 'axios';
// import Product from "./Product";
import AddTopping from './AddTopping';
import '../edit/edit.css';
import Topping from "./Topping";

class EditToppings extends React.Component {
	constructor() {
		super();
		this.state = {
			products: {},
			toppings: {}
		};

		this.getData = this.getData.bind(this);
	}

	componentDidMount() {
		this.getData();
	}

	getData() {
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

		axios.get('/api/toppings')
			.then((response) => {
				let toppings = {};
				for (let i = 0; i < response.data.length; ++i) {
					toppings[response.data[i]._id] = response.data[i];
				}

				this.setState({
					toppings: toppings,
				});
			});
	}

	render() {
		let mappedToppings = Object.keys(this.state.toppings).map((key) => {
			let topping = this.state.toppings[key];
			return (
				<Topping
					name={topping.name}
					price={topping.price}
					id={key}
					key={key}
					products={this.state.products}
					product={topping.product}
					callback={this.getData}
				/>
			);
		});

		return(
			<div className={'table table-striped edit'}>
				<h2>Bewerken</h2>

				<table>
					<thead>
					<tr>
						<th className={'name'}>Naam</th>
						<th className={'price'}>Prijs</th>
						<th className={'colour'}>Product</th>
						<th className={'update'}>Bijwerken</th>
						<th className={'delete'}>Verwijderen</th>
					</tr>
					</thead>
					<tbody>
					{mappedToppings}
					</tbody>
				</table>

				<AddTopping callback={this.getData} products={this.state.products} />
			</div>
		);
	}
}

export default EditToppings;
