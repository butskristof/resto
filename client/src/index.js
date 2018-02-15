import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Resto from './Resto';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Resto />, document.getElementById('root'));
registerServiceWorker();
