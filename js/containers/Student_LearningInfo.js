// React =================================
import React, { Component } from 'react';

// Redux =================================
import { bindActionCreators } from "redux";

// React-Redux =================================
import { connect } from "react-redux";

// Action Types =================================
import { currentErrand } from "../actions/index.js";
import { fetchUserDatabase } from "../actions/index.js";

// Firebase =====================================
import * as firebase from "firebase";

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';


export class StudentLearningInfo extends Component {

  componentDidMount(){
      // Get current errand id
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          this.props.fetchUserDatabase(user.uid);

          // Get current errand data
          setTimeout( () => {
            for (var currentErrandID in this.props.userDatabase[0]);
            this.props.currentErrand(user.uid, currentErrandID);
          }, 1000);
          
        }
  
        else{
         hashHistory.push('/')
        }
      })

  }

  renderAge(){
      return (
        <p>{this.props.currentErrandReducer[0].learning.math.a}</p>
      )
  }
  
  render() {

    if(this.props.currentErrandReducer[0]) {
      return (
        <div id="test_wrapper">
          {this.renderAge()}
          <button onClick={this.hide}>Post Test</button>
          <button onClick={this.renderAge.bind(this)}>Show data</button>
          <Link to="/" onClick={this.logOut} id="btnLogin" className="login_btn">Log Out</Link>
        </div>
      );
    }
  
    else {
      return (
        <div id="test_wrapper">
          <div className="spinner"></div>
        </div>
      )
    }
  
  }

}



function mapStateToProps(state){
	return { userDatabase: state.userDatabase, currentErrandReducer: state.currentErrandReducer };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators ({currentErrand, fetchUserDatabase}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentLearningInfo);

/*

      for(var prop in this.props.testReducer[0].react.multiple){
        console.log("This is prop", prop + " with value: " + this.props.testReducer[0].react.multiple[prop])
      }

*/