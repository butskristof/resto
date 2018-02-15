import React from 'react';
import axios from 'axios';

class Add extends React.Component{

	constructor(props) {
		super(props);
		this.state ={
			name: "",
			price: 0,
			categories: this.props.categories,
		};

		this.updateName = this.updateName.bind(this);
		this.updatePrice = this.updatePrice.bind(this);
		this.addProduct = this.addProduct.bind(this);
		this.clear = this.clear.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			categories: nextProps.categories,
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

		let mappedCategories = Object.keys(this.state.categories).map((key) => {
			let category = this.state.categories[key];
				return (
					<option key={category._id}>
						{category.name}
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

					<select>
						{mappedCategories}
					</select>

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
