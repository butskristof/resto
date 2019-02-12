import React from 'react';
import axios from 'axios';

class AddTopping extends React.Component{

	constructor(props) {
		super(props);
		this.state ={
			name: "",
			price: 0,
			product: "",
			products: {}
		};

		this.updateName = this.updateName.bind(this);
		this.updatePrice = this.updatePrice.bind(this);
		this.addTopping = this.addTopping.bind(this);
		this.clear = this.clear.bind(this);
		this.updateProduct = this.updateProduct.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			products: nextProps.products,
			product: Object.keys(nextProps.products)[0]
		});
	}

	updateName(event) {
		this.setState({
			name: event.target.value,
		});
	}

	updatePrice(event) {
		this.setState({
			price: event.target.value,
		});
	}

	clear() {
		this.setState({
			name: "",
			price: 0,
			product: Object.keys(this.state.products)[0]
		});
	}

	addTopping(event) {
		event.preventDefault();
		let price = parseFloat(this.state.price);

		if (this.state.name !== "" && this.state.name !== null && !isNaN(price)) {
			axios
				.post('/api/toppings', {
					name: this.state.name,
					price: this.state.price,
					product: this.state.product})
				.then(this.clear)
				.then(this.props.callback);
		}
	}

	updateProduct(event) {
		this.setState({
			product: event.target.value,
		})

	}

	render() {
		let mappedProducts = Object.keys(this.state.products).map((key) => {
			let product = this.state.products[key];
				return (
					<option key={product._id} value={product._id}>
						{product.name}
					</option>
				);
			});

		return (
			<div>
				<h2>Toevoegen</h2>

				<form>
					<div className={'form-group'}>
						<label htmlFor="name">Naam</label>
						<input type="text" className={'form-control'} id={'name'} value={this.state.name} name={'name'} onChange={this.updateName} />
					</div>
					<div className={'form-group'}>
						<label htmlFor="price">Prijs</label>
						<input type="text" className={'form-control'} id={'price'} value={this.state.price} name={'price'} onChange={this.updatePrice} />
					</div>

					<div className={'form-group'}>
						<select onChange={this.updateProduct} value={this.state.product}>
							{mappedProducts}
						</select>
					</div>

					<button
						className={'btn btn-primary'}
						onClick={this.addTopping}
					>
						Toevoegen
					</button>
				</form>
			</div>
		);
	}

}

export default AddTopping;
