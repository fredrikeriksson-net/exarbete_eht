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

// Hämtar hela databasen med userID
export function fetchUserDatabase(userID){

// Const for Firebase...
const rootRef = firebase.database().ref().child("users");
const secure = rootRef.child(userID);


	return dispatch => {
		secure.on("child_added", snap => {
			dispatch({
				type: types.FETCH_USER_DATABASE,
				payload: snap.val()
			})
		})
	};

}

// Hämtar senaster ärendet
export function currentErrand(userID, currentErrandID){

// Const for Firebase...
const rootRef = firebase.database().ref().child("users");
const secure = rootRef.child(userID);
const school = secure.child("harvard"); // Plocka namn från user.info
const errand = school.child(currentErrandID)
	
	return dispatch => {
		errand.on("value", snap => {
			dispatch({
				type: types.FETCH_CURRENT_ERRAND,
				payload: snap.val()
			})
		})
	};

}



// ------------------------------------------------------------------------------------------
// Lägg till en action för att hämta senaste tillaggda POSTEN (dvs difficulty, freq osv osv)
// ------------------------------------------------------------------------------------------



// Lägger till Basinfo
export function addBasicInfo(userID, teacherName, teacherClass, teacherSubject, studentName, studentAge, studentClass, studentMentor, studentTime){
	
const rootRef = firebase.database().ref().child("users");
const secure = rootRef.child(userID);
const school = secure.child("harvard"); // Plocka namn från user.info
	
	var basicInfoKey = school.push({
		basicInfo: {
			teacher: {
				name: teacherName,
				class: teacherClass,
				subject: teacherSubject
			},
			student: {
				name: studentName,
				age: studentAge,
				class: studentClass,
				mentor: studentMentor,
				mentepontum: studentTime
			},
		},
	});

}

// Lägger till Inlärnings info
export function addLearning(userID, currentErrandID, subject, difficulty, frequency, instructionIssue, staminaIssue){


const rootRef = firebase.database().ref().child("users");
const secure = rootRef.child(userID);
const school = secure.child("harvard");
const pushID = school.child(currentErrandID)
const postsRef = pushID.child("learning");
// const subjectRef = postsRef.child(subject)

	
	postsRef.push({
		subject: subject,
		difficulty: difficulty,
		frequency: frequency,
		instructionIssue: instructionIssue,
		staminaIssue: staminaIssue
	});


/*
	console.log("Learning Action triggered");
	console.log("Current Errand ID: ", currentErrandID)
	console.log("Valt Ämne: ", subject)
	console.log("Svårighet vald: ", difficulty)
	console.log("Frekvens vald: ", frequency)
	console.log("Instruktioner vald: ", instructionIssue)
	console.log("Uthållighet vald: ", staminaIssue)
*/


}








export function addErrandNumber(userID){

const rootRef = firebase.database().ref().child("users");
const secure = rootRef.child(userID);
const school = secure.child("harvard");
// const pushID = school.child("-Ke55aGnorle4f-UStmi")
var postsRef = pushID.child("learning");
/*
school.push({
		basicInfo: {
			teacher: {
				name: "Greger",
				class: "9b",
				subject: "Matte"
			},
			student: {
				name: "Billy",
				age: "12",
				class: "9b",
				mentor: "Greger",
				mentepontum: "6"
			},
		},
	});
*/


postsRef.push({
	swedish: {
		prob: "1",
		freq: "3",
		when: "homework"
	}
})


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