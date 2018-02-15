import React from 'react';
import axios from 'axios';
import Product from "./Product";
import Add from './Add';

class Edit extends React.Component {
	constructor() {
		super();
		this.state = {
			products: {},
			categories: {}
		};
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
					// onClick={() => this.props.addToOrder(key)}
				/>
			);
		});

		return(
			<div>
				<h2>Edit</h2>

				<ul className={'list-group'}>
					{mappedProducts}
				</ul>

				<Add test={this.getData} categories={this.state.categories} />
			</div>
		);
	}
}

export default Edit;
