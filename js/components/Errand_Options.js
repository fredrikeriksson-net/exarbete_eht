// React 
import React, { Component } from 'react';

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';

// Firebase 
import * as firebase from "firebase";


export default class ErrandOptions extends Component {

studentErrand(){
	firebase.auth().onAuthStateChanged(user => {
	  if(user){
			hashHistory.push('/student-basic-info');
	  }
	})
}

groupErrand(){
	firebase.auth().onAuthStateChanged(user => {
	  if(user){
			hashHistory.push('/group-errend');
	  }
	})
}

logOut(){
	firebase.auth().signOut()
  location.reload();
}


render(){
	return(
		<div>
			<button onClick={this.studentErrand}>Student Arrend</button>
			<button onClick={this.groupErrand}>Group Arrend</button>
			<Link to="/" onClick={this.logOut}>Log Out</Link>
		</div>
	)
}

}