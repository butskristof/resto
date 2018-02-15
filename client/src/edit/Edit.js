import React from 'react';
import axios from 'axios';
import Product from "./Product";
import Add from './Add';

class Edit extends React.Component {
	constructor() {
		super();
		this.state = {
			products: {},
		};
	}

	componentDidMount() {
		this.getData();
		// axios
		// 	.get('/api/products')
		// 	.then((response) => {
		// 		let prod = {};
		// 		for (let i = 0; i < response.data.length; ++i) {
		// 			prod[response.data[i]._id] = response.data[i];
		// 		}
		//
		// 		this.setState({
		// 			products: prod,
		// 		});
		// 	});
	}

	getData() {
		console.log('here');
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

				<Add test={this.getData}/>
			</div>
		);
	}
}

export default Edit;
