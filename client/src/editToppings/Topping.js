import React from 'react';
import Currency from 'react-currency-formatter';
import axios from 'axios';

class Topping extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			price: this.props.price,
			product: this.props.product,
			id: this.props.id,
			key: this.key,
			editing: false
		};

		this.toggleEditing = this.toggleEditing.bind(this);
		this.display = this.display.bind(this);
		this.edit = this.edit.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.updateName = this.updateName.bind(this);
		this.updatePrice = this.updatePrice.bind(this);
		this.updateProduct = this.updateProduct.bind(this);
	}

	toggleEditing() {
		this.setState({
			editing: !this.state.editing,
		});
	}

	onUpdate() {
		let price = parseFloat(this.state.price);

		if (!isNaN(price)) {
			axios
				.put('/api/toppings/' + this.state.id, {
					name: this.state.name,
					price: price,
					product: this.state.product
				})
				.then((result) => {
					console.log(result);
				});
			this.toggleEditing();
		}
	}

	onDelete() {
		axios
			.delete('/api/toppings/' + this.state.id)
			.then((result) => {
				console.log(result);
			})
			.then(this.props.callback);
		this.toggleEditing();
	}

	updateName(event) {
		let name = event.target.value;

		this.setState({
			name: name
		});
	}

	updatePrice(event) {
		let price = event.target.value;
		this.setState({
			price: price
		});
	}

	updateProduct(event) {
		this.setState({
			product: event.target.value,
		})

	}

	edit() {
		let mappedProducts = Object.keys(this.props.products).map((key) => {
			let product = this.props.products[key];
			return (
				<option key={product._id} value={product._id}>
					{product.name}
				</option>
			);
		});


		return(
				<tr>

					<td>
						<input type="text" value={this.state.name} name={'name'} onChange={this.updateName} />
					</td>
					<td>
						<input type="text" value={this.state.price} name={'price'} onChange={this.updatePrice} />
					</td>
					<td>
						<select onChange={this.updateProduct} defaultValue={this.state.product} >
							{mappedProducts}
						</select>
					</td>
					<td>
						<button
							className={'btn btn-primary'}
							onClick={this.onUpdate}
						>
							Update
						</button>
					</td>
					<td>
						<button
							className={'btn btn-danger'}
							onClick={this.onDelete}
						>
							Delete
						</button>
					</td>
				</tr>
		);
	}

	display() {
		let productname = "";
		if (this.props.products[this.state.product]) {
			productname = this.props.products[this.state.product].name;
		}

		return(
				<tr
					onClick={this.toggleEditing}
				>
					<td>{this.state.name}</td>
					<td><Currency quantity={parseFloat(this.state.price)} currency={"EUR"} /></td>
					<td>{productname}</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
		);
	}

	render() {
		let content = this.state.editing ? this.edit() : this.display();

		return content;
	}
}

export default Topping;
