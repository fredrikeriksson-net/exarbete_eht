// React 
import React, { Component } from 'react';

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';

// Firebase 
import * as firebase from "firebase";

// Action Types 
import { addErrandNumber } from "../actions/index.js";
import { addBasic } from "../actions/index.js";





export default class CreateMatter extends Component {

createMatterNumber(){

	firebase.auth().onAuthStateChanged(user => {
	  if(user){
	  	// Fyra av en action som skapar ärendenummer
			addErrandNumber(user.uid);
	  }
	})


// Skicka vidare till basinfo



}

addBasicInfo(){

	firebase.auth().onAuthStateChanged(user => {
	  if(user){
	  	// Fyra av en action som skapar ärendenummer
			addBasic(user.uid);
	  }
	})


// Skicka vidare till basinfo



}


render(){
	return(
		<div>
		<button onClick={this.createMatterNumber}>Create Arrend</button>
		<button onClick={this.addBasicInfo}>Add Basic</button>
		</div>
	)
}

}