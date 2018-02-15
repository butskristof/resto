import React from 'react';
import Currency from 'react-currency-formatter';
import NumericInput from 'react-numeric-input';
import axios from 'axios';

class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			price: this.props.price,
			id: this.props.id,
			key: this.key,
			editing: false
		};

		this.toggleEditing = this.toggleEditing.bind(this);
		this.display = this.display.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.updateName = this.updateName.bind(this);
		this.updatePrice = this.updatePrice.bind(this);
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
				.put('/api/products/' + this.state.id, {name: this.state.name, price: price})
				.then((result) => {
					// console.log(result);
				});
			this.toggleEditing();
		}

	}

	onDelete() {
		axios
			.delete('/api/products/' + this.state.id)
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

	edit() {
		return(
			<div>
				<li
					className={'list-group-item'}
				>

					<input type="text" value={this.state.name} name={'name'} onChange={this.updateName} />
					<input type="text" value={this.state.price} name={'price'} onChange={this.updatePrice} />

					<button
						className={'btn btn-primary'}
						onClick={this.onUpdate}
					>
						Update
					</button>
					<button
						className={'btn btn-danger'}
						onClick={this.onDelete}
					>
						Delete
					</button>
				</li>
			</div>
		);
	}

	display() {
		return(
			<div>
				<li
					className={'list-group-item'}
					// className={'menuButton btn btn-primary'}
					// type="button"
					onClick={this.toggleEditing}
				>
					{this.state.name} - <Currency quantity={this.state.price} currency={"EUR"} />
				</li>
			</div>
		);
	}

	render() {
		let content = this.state.editing ? this.edit() : this.display();

		return content;
	}
}

export default Product;
