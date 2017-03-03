// React =================================
import React, { Component } from 'react';

// Action Types =================================
import { addBasicInfo } from "../actions/index.js";

// Firebase =====================================
import * as firebase from "firebase";

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';


export default class StudentBasicInfo extends Component {

  postBasicInfo(){
    // Läraren Basinfo
    var teacherName = document.getElementById("teacher_name").value;
    var teacherClass = document.getElementById("teacher_class").value;
    var teacherSubject = document.getElementById("teacher_subject").value;

    // Eleven Basinfo
    var studentName = document.getElementById("student_name").value;
    var studentAge = document.getElementById("student_age").value;
    var studentClass = document.getElementById("student_class").value;
    var studentMentor = document.getElementById("student_mentor").value;
    var studentTime = document.getElementById("student_time").value;


    firebase.auth().onAuthStateChanged(user => {
      if(user){
        addBasicInfo(user.uid, teacherName, teacherClass, teacherSubject, studentName, studentAge, studentClass, studentMentor, studentTime);
      }
    })

  }

  logOut(){
    firebase.auth().signOut()
    location.reload();
  }

  
  render() {

      return (
        <div id="basic_wrapper">
        <h1>Basinfo</h1>
          
          <div id="teacher_wrapper">
            <h2>Läraren</h2>
            <div id="teacher_input_wrapper">
              <input type="text" id="teacher_name" placeholder="Namn"></input>
              <input type="text" id="teacher_class" placeholder="Klass"></input>
              <input type="text" id="teacher_subject" placeholder="Ämne"></input>
            </div>
          </div>

          <div id="student_wrapper">
            <h2>Eleven</h2>
            <div id="student_input_wrapper">
              <input type="text" id="student_name" placeholder="Namn"></input>
              <input type="text" id="student_age" placeholder="Ålder"></input>
              <input type="text" id="student_class" placeholder="Klass"></input>
              <input type="text" id="student_mentor" placeholder="Mentor"></input>
              <input type="text" id="student_time" placeholder="Tid på Mentepontom"></input>
            </div>
          </div>

          <Link to="/student-learning-info" onClick={this.postBasicInfo}>Nästa</Link>
          <Link to="/" onClick={this.logOut}>Log Out</Link>

        </div>
      );
  
  
  }

}