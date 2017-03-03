// StyleSheets 
import NormalizeCSS from "../css/normalize.css";
import globalCss from "../css/00-global.css";
import LoginCss from "../css/01-login.css";
// import testCss from "../css/01-test.css";

// React 
import React from 'react';
import ReactDOM from 'react-dom';

// Redux 
import { createStore, applyMiddleware } from 'redux';

	// React-Redux 
	import { Provider } from 'react-redux';
	
	// Redux Logger 
	import createLogger from 'redux-logger';
	
	// Redux Thunk 
	import thunk from "redux-thunk";
	
	// Reducers 
	import reducers from './reducers';

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';

// Firebase 
import * as firebase from "firebase";


// Components / Containers
import Login from "./components/Login";
import ErrandOptions from "./components/Errand_Options";
import StudentBasicInfo from "./components/Student_BasicInfo";
import StudentLearningInfo from "./containers/Student_LearningInfo";


// TEST -------
import CreateMatter from "./components/Create_Matter";
import TestFirebase from "./containers/firebase_test";
// ------------

// Constants 
const logger = createLogger(); // Logger
const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore); // Create Store and add Middleware
const app = document.getElementById("app"); // Mount



ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
	 	<Router history={hashHistory}>
	 		<Route path='/' component={Login} />
				<Route path='errand-options' component={ErrandOptions} />
				<Route path='student-basic-info' component={StudentBasicInfo} />
				<Route path='student-learning-info' component={StudentLearningInfo} />




				<Route path='test-route' component={TestFirebase} />
		</Router>
	</Provider>,
	app
);