// React 
import React, { Component } from 'react';

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';

// Firebase 
import * as firebase from "firebase";


export default class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      error: "hide"
    }
  }

  componentDidMount(){

    // Get Elements
    const txtEmail = document.getElementById("txtEmail");
    const txtPassword = document.getElementById("txtPassword");
    const btnLogin = document.getElementById("btnLogin");
    const errorMessage = document.getElementById("error")

    // Add login event
    btnLogin.addEventListener("click", e => {

    // Sign in with Enter
    document.getElementById("txtPassword")
    .addEventListener("keyup", function(event){
      event.preventDefault();
      if (event.keyCode == 13){
        document.getElementById("btnLogin").click();
      }
    });

    // Get email and password
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();

    // Sign in / With error handling
    const promise = auth.signInWithEmailAndPassword(email, password);
      promise.catch(function(e){
        if(e.code === "auth/wrong-password"){
          errorMessage.innerHTML = "Fel Lösenord";
          txtPassword.value = "";
          this.setState({error: "show"});
        }
        if(e.code === "auth/invalid-email"){
          errorMessage.innerHTML = "Skriv in en korrekt e-mail address";
          txtPassword.value = "";
          this.setState({error: "show"});
        }
        if(e.code === "auth/user-not-found"){
          errorMessage.innerHTML = "Användaren finns ej";
          txtPassword.value = "";
          this.setState({error: "show"});
        }
      }.bind(this))

    });

    // If login is a success, send to Errand Options
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        hashHistory.push('/errand-options')          
      }
    })

  }
    
    // Hide Error message
    closeError(){
      this.setState({error:"hide"})
    }

  render() {
    return (
      <div className="wrapper">
        <img className="logo" src="../img/logo.svg" />
        <div className="login_container">
          <p className="input">E-mail</p>
            <input id="txtEmail" type="email" placeholder="&#9993;" />
          <p className="input">Password</p>
            <input id="txtPassword" type="password" placeholder="&#9679; &#9679; &#9679;" />
          <button id="btnLogin" className="logout_btn">Log In</button>
        </div>
        <div className="error_container" id={this.state.error}>
          <p id="error">error</p><a className="close" onClick={this.closeError.bind(this)}>&#10006;</a>
        </div>
      </div>
    );
  }

}

/*
      <div>
      <img src="../img/logo.svg"/>
      <div className="login_wrapper">
        <div className="login_container">
          <p className="input">E-Mail</p>
          <input id="txtEmail" type="email" placeholder="E-Mail" />
          <p className="input">Password</p>
          <input id="txtPassword" type="password" placeholder="Password" />
          <button id="btnLogin" className="logout_btn">Log In</button>
          <p id="error"></p>
        </div>
    </div>
    </div>

*/

/*

      <div className="wrapper">

        <div className="wrapper_logo">
          <img className="logo" src="../img/logo.svg" /><h1>Underlag för EHT</h1>
        </div>
      
        <div className="wrapper_login">
          <p className="input">E-Mail</p>
          <input id="txtEmail" type="email" placeholder="E-Mail" />
          <p className="input">Password</p>
          <input id="txtPassword" type="password" placeholder="Password" />
          <button id="btnLogin" className="logout_btn">Logga in</button>
        </div> 

        <div className="wrapper_error">
          <p id="error">Error</p>
          <p>Stäng</p>
        </div>
      
      </div>

*/