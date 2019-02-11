import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Resto from './Resto';
import Edit from './edit/Edit';
import EditToppings from './editToppings/EditToppings';
import Stats from './stats/Stats';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( (
	<Router>
		<Switch>
			<Route exact path="/" component={Resto} />
			<Route path="/edit" component={Edit} />
			<Route path="/editToppings" component={EditToppings} />
			<Route path="/stats" component={Stats} />
			<Route path={"*"} component={Resto} />
		</Switch>
	</Router>
), document.getElementById('root') );

registerServiceWorker();
