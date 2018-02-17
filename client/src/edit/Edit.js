import React from 'react';
import axios from 'axios';
import Product from "./Product";
import Add from './Add';
import './edit.css';

class Edit extends React.Component {
	constructor() {
		super();
		this.state = {
			products: {},
			categories: {}
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

	render() {

		let mappedProducts = Object.keys(this.state.products).map((key) => {
			let product = this.state.products[key];
			return (
				<Product
					name={product.name}
					price={product.price}
					id={key}
					key={key}
					categories={this.state.categories}
					category={product.category}
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
							<th className={'colour'}>Kleur</th>
							<th className={'update'}>Bijwerken</th>
							<th className={'delete'}>Verwijderen</th>
						</tr>
					</thead>
					<tbody>
						{mappedProducts}
					</tbody>
				</table>

				<Add callback={this.getData} categories={this.state.categories} />
			</div>
		);
	}
}

export default Edit;
