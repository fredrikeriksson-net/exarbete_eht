// React 
import React, { Component } from 'react';

// Redux 
import { bindActionCreators } from "redux";

// React-Redux 
import { connect } from "react-redux";

// Action Types 
import { currentErrand } from "../actions/index.js";
import { fetchUserDatabase } from "../actions/index.js";
import { addLearning } from "../actions/index.js";

// Firebase 
import * as firebase from "firebase";

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';


export class StudentLearningInfo extends Component {
  constructor(props){
    super(props)

    // BINDINGS
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
    this.handleinstructionIssue = this.handleinstructionIssue.bind(this);
    this.handleStaminaIssue = this.handleStaminaIssue.bind(this);

    this.state = {
      learningInput: "hide",
      subjectValue: "",
      selectedDifficulty: "1",
      selectedFrequency: "1",
      instructionIssue: false,
      staminaIssue: false
    }
  }

  componentDidMount(){
      // Get current errand id
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          this.props.fetchUserDatabase(user.uid);

          // Get current errand data
          setTimeout( () => {
            for (var currentErrandID in this.props.userDatabase[0]);
            this.props.currentErrand(user.uid, currentErrandID);
          }, 2000);
          
        }
  
        else{
         hashHistory.push('/')
        }
      })

  }

  logOut(){
  firebase.auth().signOut()
  location.reload();
  }

  showLearning(){
    let subjectValue = document.getElementById("subject");
    this.setState({subjectValue: subjectValue.value}) // Set subject in state for header
    this.setState({learningInput:"show"})
    // this.postLearning();
  }


  postLearning(){
    var string = "test";

      return (
        <div>

          <h2>{this.state.subjectValue}</h2>
    
          <form onSubmit={this.handleFormSubmit.bind(this)}>
            <div className="radio">
              <label>
                <input type="radio" value={"1"} checked={this.state.selectedDifficulty === "1"} onChange={this.handleDifficultyChange} />
                1
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value={"2"} checked={this.state.selectedDifficulty === "2"} onChange={this.handleDifficultyChange} />
                2
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value={"3"} checked={this.state.selectedDifficulty === "3"} onChange={this.handleDifficultyChange} />
                3
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value={"4"} checked={this.state.selectedDifficulty === "4"} onChange={this.handleDifficultyChange} />
                4
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value={"5"} checked={this.state.selectedDifficulty === "5"} onChange={this.handleDifficultyChange} />
                5
              </label>
            </div>
            <div className="range">
              <label>
                <input type="range" value={this.state.selectedFrequency} min="1" max="10" step="1" onChange={this.handleFrequencyChange} />
                <p>{this.state.selectedFrequency}</p>
                Frekvens
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" value={this.state.instructionIssue} checked={this.state.instructionIssue} onChange={this.handleinstructionIssue} />
                Förstå Instruktioner
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" value={this.state.staminaIssue} checked={this.state.staminaIssue} onChange={this.handleStaminaIssue} />
                Uthållighet
              </label>
            </div>


            <button type="submit">Lägg till</button>
          </form>
  
  
        </div>
      )

  }

  handleDifficultyChange(changeEvent){
    this.setState({selectedDifficulty: changeEvent.target.value});
  }

  handleFrequencyChange(changeEvent){
    this.setState({selectedFrequency: changeEvent.target.value});
  }

  handleinstructionIssue(changeEvent){
    if(this.state.staminaIssue === false){
      this.setState({instructionIssue: true})
    }
    else {
      this.setState({instructionIssue: false})
    }
  }

  handleStaminaIssue(changeEvent){
    if(this.state.staminaIssue === false){
      this.setState({staminaIssue: true})
    }
    else {
      this.setState({staminaIssue: false})
    }
  }

  handleFormSubmit(formSubmitEvent){
    formSubmitEvent.preventDefault();

    firebase.auth().onAuthStateChanged(user => {
      if(user){
        for (var currentErrandID in this.props.userDatabase[0]);
      }
    
    // console.log("Errand ID: ", currentErrandID)
    // console.log("Valt Ämne: ", this.state.subjectValue);
    // console.log("Svårighet vald: ", this.state.selectedDifficulty);
    // console.log("Frekvens vald: ", this.state.selectedFrequency);
    // console.log("Instruktioner vald: ", this.state.instructionIssue);
    // console.log("Uthållighet vald: ", this.state.staminaIssue);
    this.setState({learningInput:"hide"})

    // addLearning action
    addLearning(user.uid, currentErrandID, this.state.subjectValue, this.state.selectedDifficulty, this.state.selectedFrequency, this.state.instructionIssue, this.state.staminaIssue);

    })


  }

  clearForm(){
    this.setState({selectedDifficulty: "1"});
    this.setState({selectedFrequency: "1"});
    this.setState({instructionIssue: false});
    this.setState({staminaIssue: false});
  }

  showSubjects(){
    return  (
      <div className="outerDiv">
      {Object.keys(this.props.currentErrandReducer[0].learning[keys]).map(function(key) {
        
        return (
          <div className="innerDiv">
            <p>{key}</p>
          </div>
        )

      })}

      </div>
    )



  }


  
  // TODO: postLearning ska vara en link och
  // skicka vidare till nästa steg
  render() {

    const progressWidth = {
      width: '60%',
    };

    if(this.props.currentErrandReducer[0]) {
      return (
        <div id="learning_wrapper">

        <header>
          <h2 className="errand_header">Steg 3: Inlärning</h2>
          <Link to="/" onClick={this.logOut} className="log_out">Logga ut</Link>
        </header>
        <div className="progress_bar" style={progressWidth}></div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div id="teacher_wrapper">
              <select id="subject" onClick={this.clearForm.bind(this)} onChange={this.showLearning.bind(this)}>
                <option value="test">Välj Ämne:</option>
                <option value="Svenska">Svenska</option>
                <option value="Matematik">Matematik</option>
                <option value="Biologi">Biologi</option>
                <option value="Kemi">Kemi</option>
              </select>
            </div>
  
            <div id={this.state.learningInput}>
  
              <div>{this.postLearning()}</div>
              
            </div>

            <div>{this.showSubjects()}</div>
  
        </div>
      );
    }
  
    else {
      return (
        <div className="spinner_wrapper">
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