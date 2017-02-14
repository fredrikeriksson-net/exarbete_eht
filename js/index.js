// StyleSheets
import globalCss from "../css/00-global.css";
import testCss from "../css/01-test.css";

// React
import React from 'react';
import ReactDOM from 'react-dom';

// Components / Containers
import Test from './components/test.js';

// Mount variable
const app = document.getElementById("app");

ReactDOM.render(
	<Test />,
	app
);