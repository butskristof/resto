import React from 'react';

class Order extends React.Component {

	render() {

		// console.log(this.props.order);
		let products = Object.keys(this.props.order.products).map((key) => {
			let productid = this.props.order.products[key].product;
			let productname = "";
			if (this.props.products[productid]) {
				productname = this.props.products[productid].name;
			}
			// console.log(productname);

			return (
					<li key={productid}>{this.props.order.products[key].quantity} * {productname}</li>
			);
		});

		return(
			<div>
				<h3>Order</h3>
				<ul>
					<li>{this.props.order.created_at}</li>
					<li>Totaal: {this.props.order.total_price}</li>
					<li>Producten:<br />
						<ul>
							{products}
						</ul>
					</li>
				</ul>
			</div>
		)
	}
}

export default Order;
