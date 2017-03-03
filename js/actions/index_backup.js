// Action Types 
import * as types from "../constants/ActionTypes";

// Firebase 
import * as firebase from "firebase";

// Firebase config (try to import this instead!)
var config = {
	apiKey: "AIzaSyCgafWj7MAmmlRnN43wvqTbgR8nHoGR_vw",
  authDomain: "exarbete-eht.firebaseapp.com",
  databaseURL: "https://exarbete-eht.firebaseio.com",
  storageBucket: "exarbete-eht.appspot.com",
  messagingSenderId: "353055445802"
};
firebase.initializeApp(config);



export function firebaseTestAction(userID){

// Const for Firebase...
const rootRef = firebase.database().ref().child("users");
const secure = rootRef.child(userID);

	return dispatch => {
		secure.on("value", snap => {
			dispatch({
				type: types.ACTION_TEST,
				payload: snap.val()
			})
		})
	};

}


export function addErrandNumber(userID){

const rootRef = firebase.database().ref().child("users");
const secure = rootRef.child(userID);

secure.set({
	errendNo: {
		basicInfo: {
			teacher: {
				name: "Ralf",
				class: "9b",
				subject: "Träslöjd"
			},
			student: {
				name: "Billy",
				age: "12",
				class: "9b",
				mentor: "Greger",
				mentepontum: "6"
			},
		},
	}
	
	});

}

/*
export function addErrandNumber(userID){

// Const for Firebase...
const rootRef = firebase.database().ref().child("users");
const secure = rootRef.child(userID);
const schoolName = secure.child("schoolname")

	secure.push("errendOne")

}
*/








/*
// Get a database reference to our blog
var db = admin.database();
var ref = db.ref("server/saving-data/fireblog");

var usersRef = ref.child("users");
usersRef.set({
  
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  }

});
*/

/*
TEST

export function addErrandNumber(userID){

	// Get a database reference to our blog
	var db = firebase.database();
	var ref = db.ref(userID);
	var usersRef = ref.child("Harvard");

	usersRef.set({
	  
	  errendOne: {
	  }
	
	});

}

*/