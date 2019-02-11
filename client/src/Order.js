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
			var orderline = this.state.order[key];
			return (
				<tr key={key}>
					<td>{orderline.name}</td>
					<td>
					<div className={'number'}>{orderline.quantity}</div>
					<div className={'add'}>
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
					</div>
					</td>
					<td><Currency quantity={orderline.price} currency={"EUR"} /></td>
					<td><Currency quantity={orderline.price * orderline.quantity} currency={"EUR"} /></td>
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
