// React 
import React, { Component } from 'react';

// Redux 
import { bindActionCreators } from "redux";

// React-Redux 
import { connect } from "react-redux";

// Action Types 
import { currentErrand } from "../actions/index.js";
import { fetchUserDatabase } from "../actions/index.js";
import { addBehavior } from "../actions/index.js";
import { deleteSelectedBehavior } from "../actions/index.js";

// Firebase 
import * as firebase from "firebase";

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';


export class StudentBehaviorInfo extends Component {

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

  showSubjects(){
    var subjectArray = [];
   
    for(var learningID in this.props.currentErrandReducer[0].learning){

    var width = {
      width: this.props.currentErrandReducer[0].learning[learningID].difficulty * 10 + "%",
    };


      subjectArray.push (
        <div key={learningID}>
          <h2>{this.props.currentErrandReducer[0].learning[learningID].subject}</h2>
          <p>Måluppfyllnad: {this.props.currentErrandReducer[0].learning[learningID].difficulty}</p>
          <div className="bar" style={width}></div>
          <p>Inlärningssvårigheter:</p>
          {this.props.currentErrandReducer[0].learning[learningID].onsetIssue === true ? <p>Ingångsättning</p> : <p id="hide"></p>}
          {this.props.currentErrandReducer[0].learning[learningID].staminaIssue === true ? <p>Uthållighet</p> : <p id="hide"></p>}
          {this.props.currentErrandReducer[0].learning[learningID].closingIssue === true ? <p>Avslut</p> : <p id="hide"></p>}
          {this.props.currentErrandReducer[0].learning[learningID].slowWorkFlowIssue === true ? <p>Långsam arbetsgång</p> : <p id="hide"></p>}
          {this.props.currentErrandReducer[0].learning[learningID].groupInstructionIssue === true ? <p>Svårt att förstå gruppinstruktioner</p> : <p id="hide"></p>}
          {this.props.currentErrandReducer[0].learning[learningID].individualInstructionIssue === true ? <p>Svårt att förstå individuella instruktioner</p> : <p id="hide"></p>}
          {this.props.currentErrandReducer[0].learning[learningID].loseTrackIssue === true ? <p>Kommer av sig under arbetet</p> : <p id="hide"></p>}
          {this.props.currentErrandReducer[0].learning[learningID].readWriteIssue === true ? <p>Läs och skriv svårigheter</p> : <p id="hide"></p>}
          {this.props.currentErrandReducer[0].learning[learningID].followInstructionsIssue === true ? <p>Svårt att följa instruktioner</p> : <p id="hide"></p>}
          {this.props.currentErrandReducer[0].learning[learningID].amountsIssue === true ? <p>Svårt med mängder</p> : <p id="hide"></p>}
          {this.props.currentErrandReducer[0].learning[learningID].strategiesIssue === true ? <p>Använda sig av strategier</p> : <p id="hide"></p>}
          {this.props.currentErrandReducer[0].learning[learningID].numbersIssue === true ? <p>Svårt med taluppfattning (10 systemet, addition, subtraktion)</p> : <p id="hide"></p>}

          {this.props.currentErrandReducer[0].learning[learningID].onsetIssue === false &&
          this.props.currentErrandReducer[0].learning[learningID].staminaIssue === false &&
          this.props.currentErrandReducer[0].learning[learningID].closingIssue === false &&
          this.props.currentErrandReducer[0].learning[learningID].slowWorkFlowIssue === false &&
          this.props.currentErrandReducer[0].learning[learningID].groupInstructionIssue === false &&
          this.props.currentErrandReducer[0].learning[learningID].individualInstructionIssue === false &&
          this.props.currentErrandReducer[0].learning[learningID].loseTrackIssue === false &&
          this.props.currentErrandReducer[0].learning[learningID].readWriteIssue === false &&
          this.props.currentErrandReducer[0].learning[learningID].followInstructionsIssue === false &&
          this.props.currentErrandReducer[0].learning[learningID].amountsIssue === false &&
          this.props.currentErrandReducer[0].learning[learningID].strategiesIssue === false &&
          this.props.currentErrandReducer[0].learning[learningID].numbersIssue === false ? <p>Inga områden valda</p> : <p id="hide"></p>}          
        </div>
      )

    }

    return(
      <div className="subject_wrapper">
        {subjectArray}
      </div>
    )

  }

  showBehaviors(){
    var behaviorArray = [];

    for(var behaviorID in this.props.currentErrandReducer[0].behavior){

      behaviorArray.push(
        <div key={behaviorID} className="show_behavior_container">

          <h2>{this.props.currentErrandReducer[0].behavior[behaviorID].behaviorValue}</h2>
          
          {this.props.currentErrandReducer[0].behavior[behaviorID].rulesIssue === true ? <p>Rules: {this.props.currentErrandReducer[0].behavior[behaviorID].rulesFrequency}</p> : <p id="hide"></p>}
          {this.props.currentErrandReducer[0].behavior[behaviorID].verbalIssue === true ? <p>Verbal: {this.props.currentErrandReducer[0].behavior[behaviorID].verbalFrequency}</p> : <p id="hide"></p>}
          {this.props.currentErrandReducer[0].behavior[behaviorID].aggressiveIssue === true ? <p>Aggressive: {this.props.currentErrandReducer[0].behavior[behaviorID].aggressiveFrequency}</p> : <p id="hide"></p>}
          {this.props.currentErrandReducer[0].behavior[behaviorID].seclusiveIssue === true ? <p>Seclusive: {this.props.currentErrandReducer[0].behavior[behaviorID].seclusiveFrequency}</p> : <p id="hide"></p>}
          

          <button onClick={this.delBehavior.bind(this, behaviorID)}>Radera ämne</button>
        </div>
      )

    }

    return(
      <div className="behavior_wrapper">
        {behaviorArray}
      </div>
    )

  }

  
  render() {

    const progressWidth = {
      width: '100%',
    };

    if(this.props.currentErrandReducer[0]) {
      return (
        <div id="behavior_wrapper">

        <header>
          <h2 className="errand_header">Steg 4: Sammanfattning</h2>
          <Link to="/" onClick={this.logOut} className="log_out">Logga ut</Link>
        </header>
        <div className="progress_bar" style={progressWidth}></div>
 
            <div id="behavior_info_wrapper">

            <div className="show_summary_container">
              <h2>Ämnen</h2>
              {this.showSubjects()}
            </div>

            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(StudentBehaviorInfo);

