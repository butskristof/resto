import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Resto from './Resto';
import Edit from './edit/Edit';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<Resto />, document.getElementById('root'));
ReactDOM.render(<Edit />, document.getElementById('edit'));
registerServiceWorker();
