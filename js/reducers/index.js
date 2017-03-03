// Redux =================================
import { combineReducers } from "redux";

// Reducers =================================
import userDatabase from "./reducer_userDatabase";
import currentErrandReducer from "./reducer_currentErrand";


const rootReducer = combineReducers({
	userDatabase: userDatabase,
	currentErrandReducer: currentErrandReducer
});

export default rootReducer;