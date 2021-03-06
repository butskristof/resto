import React from 'react';
import Currency from 'react-currency-formatter';
import axios from 'axios';

class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			price: this.props.price,
			id: this.props.id,
			key: this.key,
			currentCategory: this.props.category,
			editing: false
		};

		this.toggleEditing = this.toggleEditing.bind(this);
		this.display = this.display.bind(this);
		this.edit = this.edit.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.updateName = this.updateName.bind(this);
		this.updatePrice = this.updatePrice.bind(this);
		this.updateCategory = this.updateCategory.bind(this);
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
				.put('/api/products/' + this.state.id, {name: this.state.name, price: price, category: this.state.currentCategory})
				.then((result) => {
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

	updateCategory(event) {
		this.setState({
			currentCategory: event.target.value,
		})

	}

	edit() {
		let mappedCategories = Object.keys(this.props.categories).map((key) => {
			let category = this.props.categories[key];
			return (
				<option key={category._id} value={category._id}>
					{category.name}
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
						<select onChange={this.updateCategory} defaultValue={this.state.currentCategory} >
							{mappedCategories}
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
		let categoryname = "";
		if (this.props.categories[this.state.currentCategory]) {
			categoryname = this.props.categories[this.state.currentCategory].name;
		}

		return(
				<tr
					onClick={this.toggleEditing}
				>
					<td>{this.state.name}</td>
					<td><Currency quantity={this.state.price} currency={"EUR"} /></td>
					<td>{categoryname}</td>
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

export default Product;
