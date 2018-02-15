import React from 'react';
import Currency from 'react-currency-formatter';

class Order extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			order: this.props.order,
			products: this.props.products,
			totalprice: this.props.totalprice,
		}
	}

	componentWillReceiveProps(nextProps) {
		// modify with selective update
		this.setState({
			order: nextProps.order,
			products: nextProps.products,
			totalprice: nextProps.totalprice,
		});
	}
	render() {

		let mappedOrderlines = Object.keys(this.state.order).map((key) => {
			var product = this.state.products[key];
			return (
				<tr key={key}>
					<td>{product.name}</td>
					<td>{this.state.order[key]}
					<button
						className={'btn btn-sm btn-primary'}
						onClick={() => this.props.add(key)}
					>
						+
					</button>
						<button
							className={'btn btn-sm btn-primary'}
							onClick={() => this.props.remove(key)}
							>
							-
						</button>
					</td>
					<td><Currency quantity={product.price} currency={"EUR"} /></td>
					<td><Currency quantity={product.price * this.state.order[key]} currency={"EUR"} /></td>
				</tr>
			);
		});

		return (
			<div className={'order'}>
				<h2>Order</h2>
				<table>
					<thead>
					<tr>
						<th>Product</th>
						<th>Aantal</th>
						<th>Eenheidsprijs</th>
						<th>Totaalprijs</th>
					</tr>
					</thead>
					<tbody>
						{mappedOrderlines}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Order;
