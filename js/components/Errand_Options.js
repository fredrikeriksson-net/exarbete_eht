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
	
	const progressWidth = {
  	width: '10%',
	};

	return(
		<div>
			
			<header>
				<h2 className="errand_header">Steg 1: Välj Ärende</h2>
				<Link to="/" onClick={this.logOut} className="log_out">Logga ut</Link>
			</header>
			<div className="progress_bar" style={progressWidth}></div>
			
			<div className="errand_wrapper">
				
				<div className="options_wrapper">
					
					<div className="errand_container" onClick={this.studentErrand}>
						<img className="option" src="../img/choose_student.svg"/>
						<p>Enskild elev</p>
					</div>
						
					<div className="errand_container" onClick={this.groupErrand}>
						<img className="option" src="../img/choose_group.svg"/>
						<p>Grupp</p>
					</div>
	
				</div>
	
				

			</div>
		</div>
	)
}

}