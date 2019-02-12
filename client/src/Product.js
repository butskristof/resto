import React from 'react';
import Currency from 'react-currency-formatter';

class Product extends React.Component {
	constructor(props) {
		super(props);

		let checkboxValues = {};
		this.props.toppings.forEach(topping => checkboxValues[topping._id] = false);

		this.state = {
			name: this.props.name,
			price: this.props.price,
			id: this.props.id,
			// toppings: this.props.toppings,
			checkboxValues: checkboxValues,
			clearCtr: this.props.clear
		};
		this.toppingsChanged=this.toppingsChanged.bind(this);
		this.addToOrder=this.addToOrder.bind(this);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.clear !== this.props.clear) {
			this.clear(this.props.clear);
		}
	}

	clear = (clearCtr) => {
		let newCheckBoxValues = this.state.checkboxValues;
		Object.keys(newCheckBoxValues).map(key => {
			newCheckBoxValues[key] = false;
		});
		this.setState({
			clear: clearCtr,
			checkboxValues: newCheckBoxValues
		});
	};

	toppingsChanged(event, toppingId) {
		// this.state.checkboxValues[toppingId] = !this.state.checkboxValues[toppingId];
		let newValues = this.state.checkboxValues;
		newValues[toppingId] = event.target.checked;
		this.setState({
			checkboxValues: newValues
		});
	}

	addToOrder() {
		let chosenToppings = [];
		for (let key in this.state.checkboxValues) {
			if (this.state.checkboxValues[key] === true) {
				chosenToppings.push(this.props.toppings.find(t => t._id === key));
			}
		}
		// console.log(chosenToppings);

		this.props.chooseToppings(chosenToppings);
	}

	render() {
		let toppingsAvailable = this.props.toppings.length !== 0;

		let toppings = "";
		let button;

		if (toppingsAvailable) {
			toppings = (
				<div className="topping">
					Beschikbare toppings <br />

					{this.props.toppings.map(topping => (
						<label key={topping._id}>
							<input type="checkbox"
								   value={topping._id}
								   checked={this.state.checkboxValues[topping._id]}
								   onChange={(ev) => this.toppingsChanged(ev, topping._id)}
							/>
							{topping.name} - <Currency quantity={topping.price} currency={"EUR"}/>
						</label>
					))}

					<button className={"btn-order bestelknop"} onClick={this.addToOrder}>
						Bestel
					</button>
					<div className={"clear"}></div>
				</div>
			);

			button = (
				<button
					className={"btn btn-product " + this.props.styles}
					type="button"
				>
					{this.state.name} - <Currency quantity={this.state.price} currency={"EUR"} />
				</button>
			)
		} else {
			button = (
				<button
					className={"btn btn-product " + this.props.styles}
					type="button"
					onClick={() => this.props.chooseToppings(null)}
				>
					{this.state.name} - <Currency quantity={this.state.price} currency={"EUR"} />
				</button>
			)
		}


		return (
			<div>
				{button}
				{toppings}
			</div>
		);
	}
}

export default Product;
