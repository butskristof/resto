import React from 'react';
import axios from 'axios';

class Add extends React.Component{

	constructor() {
		super();
		this.state ={
			name: "",
			price: 0,
		};

		this.updateName = this.updateName.bind(this);
		this.updatePrice = this.updatePrice.bind(this);
		this.addProduct = this.addProduct.bind(this);
		this.clear = this.clear.bind(this);
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
		});
	}

	addProduct(event) {
		event.preventDefault();
		let price = parseFloat(this.state.price);

		if (this.state.name !== "" && this.state.name !== null && !isNaN(price)) {
			axios
				.post('/api/products', {name: this.state.name, price: this.state.price})
				.then(this.clear)
				.then(this.props.callback);
		}
	}

	render() {
		return (
			<div>
				<h2>Add</h2>

				<form>
					<div className={'form-group'}>
						<label htmlFor="name">Naam</label>
						<input type="text" className={'form-control'} id={'name'} value={this.state.name} name={'name'} onChange={this.updateName} />
					</div>
					<div className={'form-group'}>
						<label htmlFor="price">Prijs</label>
						<input type="text" className={'form-control'} id={'price'} value={this.state.price} name={'price'} onChange={this.updatePrice} />
					</div>


					<button
						className={'btn btn-primary'}
						onClick={this.addProduct}
					>
						Toevoegen
					</button>
				</form>
			</div>
		);
	}

}

export default Add;
