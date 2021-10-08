import ReactDom from 'react-dom';
import React from 'react';
import App from './App';

ReactDom.render(
    <React.StrictMode>
	<App />
    </React.StrictMode>
,document.getElementById('app')
);
