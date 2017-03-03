// React =================================
import React, { Component } from 'react';

// Redux =================================
import { bindActionCreators } from "redux";

// React-Redux =================================
import { connect } from "react-redux";

// Action Types =================================
import { firebaseTestAction } from "../actions/index.js";

// Firebase =====================================
import * as firebase from "firebase";

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';


export class TestFirebase extends Component {
  constructor(props){
    super(props)
    this.hide = this.hide.bind(this) // Bind det som ska ändra state

    this.state = {
      test: "asd",
      test2: 123
    }
  }

  componentDidMount(){
    // Get data if logged in
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.props.firebaseTestAction(user.uid);
      }
      else{
       hashHistory.push('/')
      }
    })
     
  }

  hide(){
    this.setState({test: "qwerty"})
  }

  postStuff(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        console.log("send " + user.uid + " to post action")

      }
    })
    

  }

  logOut(){
    firebase.auth().signOut()
    location.reload();
  }

  helperMethod(){
    console.log("State: ", this.state.test)
/*
      for(var prop in this.props.testReducer[0]){
        console.log("Prop", prop)
        for(var subProp in this.props.testReducer[0][prop].basicInfo.teacher){
          console.log("This is subProp", subProp)
          console.log("This is subProp Values", this.props.testReducer[0][prop].basicInfo.teacher[subProp])
        }
      }
*/

      for(var prop in this.props.testReducer[0]){
        console.log("Errand ID: ", prop)
        for(var subProp in this.props.testReducer[0][prop].learning){
          console.log("Learning IDs: ", subProp)
          for(var subSubProp in this.props.testReducer[0][prop].learning[subProp]){
            console.log("Subject: ", subSubProp)
            for(var soDeepProp in this.props.testReducer[0][prop].learning[subProp][subSubProp].freq){
              console.log("Value Prob: ", this.props.testReducer[0][prop].learning[subProp][subSubProp].prob)
              console.log("Value Freq: ", this.props.testReducer[0][prop].learning[subProp][subSubProp].freq)
              console.log("Value When: ", this.props.testReducer[0][prop].learning[subProp][subSubProp].when)
              // .testReducer["0"]["-Ke55aGnorle4f-UStmi"].learning["-Ke59J-koDMZPojIVnGJ"].swedish.freq
            }
          }
        }
      }


    return(
      <p>{this.props.testReducer[0]["-Ke55aGnorle4f-UStmi"].learning["-Ke59J-koDMZPojIVnGJ"].swedish.freq}</p>
    )
  }
  
  render() {
  
    if(this.props.testReducer[0]) {
      return (
        <div id="test_wrapper">
          {this.helperMethod()}
          <button onClick={this.hide}>Post Test</button>
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
	return { testReducer: state.testReducer };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators ({firebaseTestAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TestFirebase);

/*

      for(var prop in this.props.testReducer[0].react.multiple){
        console.log("This is prop", prop + " with value: " + this.props.testReducer[0].react.multiple[prop])
      }

*/