// React 
import React, { Component } from 'react';

// Redux 
import { bindActionCreators } from "redux";

// React-Redux 
import { connect } from "react-redux";

// Action Types 
import { currentErrand } from "../actions/index.js";
import { fetchUserDatabase } from "../actions/index.js";
import { addFeelings } from "../actions/index.js";

// Firebase 
import * as firebase from "firebase";

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';

export class StudentFeelingsInfo extends Component {

  constructor(props){
    super(props)

    // BINDINGS
    this.showMoreDifficulties = this.showMoreDifficulties.bind(this);


    this.handleRageChange = this.handleRageChange.bind(this);
    this.handleConcernChange = this.handleConcernChange.bind(this);
    this.handleSadChange = this.handleSadChange.bind(this);
    this.handleNervousChange = this.handleNervousChange.bind(this);
    this.handleScaredChange = this.handleScaredChange.bind(this);
    this.handleTrustChange = this.handleTrustChange.bind(this);
    this.handleFailChange = this.handleFailChange.bind(this);
    this.handleReportsChange = this.handleReportsChange.bind(this);
    this.handleTestsChange = this.handleTestsChange.bind(this);
    this.handleWrongChange = this.handleWrongChange.bind(this);

    this.handleDifficultiesChange = this.handleDifficultiesChange.bind(this);

    this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
    this.handleSufferChange = this.handleSufferChange.bind(this);


    this.state = {
      rage: "0",
      concern: "0",
      sad: "0",
      nervous: "0",
      scared: "0",
      trust: "0",
      fail: "0",
      reports: "0",
      tests: "0",
      wrong: "0",

      showMore: "hide",

      difficulties: "0",

      issueFrequency: "0",
      suffer: "0"

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

  handleFormSubmit(formSubmitEvent){
    formSubmitEvent.preventDefault();

    firebase.auth().onAuthStateChanged(user => {
      if(user){
        for (var currentErrandID in this.props.userDatabase[0]);
      }
    
    // addFeelings action
    addFeelings(user.uid, currentErrandID);

    })
  }

  handleRageChange(changeEvent){
    this.setState({rage: changeEvent.target.value});
  }

  handleConcernChange(changeEvent){
    this.setState({concern: changeEvent.target.value});
  }

  handleSadChange(changeEvent){
    this.setState({sad: changeEvent.target.value});
  }  

  handleNervousChange(changeEvent){
    this.setState({nervous: changeEvent.target.value});
  }  

  handleScaredChange(changeEvent){
    this.setState({scared: changeEvent.target.value});
  }   

  handleTrustChange(changeEvent){
    this.setState({trust: changeEvent.target.value});
  }   

  handleFailChange(changeEvent){
    this.setState({fail: changeEvent.target.value});
  }   

  handleReportsChange(changeEvent){
    this.setState({reports: changeEvent.target.value});
  }  

  handleTestsChange(changeEvent){
    this.setState({tests: changeEvent.target.value});
  }   

  handleWrongChange(changeEvent){
    this.setState({wrong: changeEvent.target.value});
  }

  handleDifficultiesChange(changeEvent){
    this.setState({difficulties: changeEvent.target.value});
  }  

  handleFrequencyChange(changeEvent){
    this.setState({issueFrequency: changeEvent.target.value});
  }   

  handleSufferChange(changeEvent){
    this.setState({suffer: changeEvent.target.value});
  }

  showMoreDifficulties(){
    return(
    
    <div id={this.state.showMore}> 
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>Mindre än 1 månad</th>
                <th>1-5 månader</th>
                <th>6-12 månader</th>
                <th>Mer än 1 år</th>
              </tr>

              <tr>
                <td className="space">Hur länge har svårigheterna funnits</td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"0"} checked={this.state.issueFrequency === "0"} onChange={this.handleFrequencyChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"1"} checked={this.state.issueFrequency === "1"} onChange={this.handleFrequencyChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"2"} checked={this.state.issueFrequency === "2"} onChange={this.handleFrequencyChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"3"} checked={this.state.issueFrequency === "3"} onChange={this.handleFrequencyChange} />
                    <span></span>
                  </label>
                </td>                
              </tr>

            </tbody>
          </table>   

          <table>
            <tbody>
              <tr>
                <th></th>
                <th>Inte alls</th>
                <th>Bara lite</th>
                <th>Ganska mycket</th>
                <th>Väldigt mycket</th>
              </tr>

              <tr>
                <td className="space">Oroas eller lider barnet av sina svårigheter</td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"0"} checked={this.state.suffer === "0"} onChange={this.handleSufferChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"1"} checked={this.state.suffer === "1"} onChange={this.handleSufferChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"2"} checked={this.state.suffer === "2"} onChange={this.handleSufferChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"3"} checked={this.state.suffer === "3"} onChange={this.handleSufferChange} />
                    <span></span>
                  </label>
                </td>                
              </tr>

            </tbody>
          </table> 
        </div> 
     );              
  };


    render() {

    const progressWidth = {
      width: '80%',
    };

    if(this.props.currentErrandReducer[0]) {
      return (
        <div id="feelings_wrapper">

        <header>
          <h2 className="errand_header">Steg 5: Styrkor och svårigheter</h2>
          <Link to="/" onClick={this.logOut} className="log_out">Logga ut</Link>
        </header>
        <div className="progress_bar" style={progressWidth}></div>
           
            
            <div className="feelings_container">

            <form onSubmit={this.handleFormSubmit.bind(this)}>
              
            <table>
            <tbody>
              <tr>
                <th></th>
                <th>Stämmer inte</th>
                <th>Stämmer delvis</th>
                <th>Stämmer helt</th>
              </tr>
              
              <tr>
                <td className="space">Har ofta raseriutbrott eller häftigt humör</td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"0"} checked={this.state.rage === "0"} onChange={this.handleRageChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"1"} checked={this.state.rage === "1"} onChange={this.handleRageChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"2"} checked={this.state.rage === "2"} onChange={this.handleRageChange} />
                    <span></span>
                  </label>
                </td>
              </tr>
              
              <tr>
                <td className="space">Oroar sig över mycket, verkar ofta bekymrad</td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"0"} checked={this.state.concern === "0"} onChange={this.handleConcernChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"1"} checked={this.state.concern === "1"} onChange={this.handleConcernChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"2"} checked={this.state.concern === "2"} onChange={this.handleConcernChange} />
                    <span></span>
                  </label>
                </td>
              </tr>
              
              <tr>
                <td className="space">Ofta ledsen, nedstämd eller tårögd</td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"0"} checked={this.state.sad === "0"} onChange={this.handleSadChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"1"} checked={this.state.sad === "1"} onChange={this.handleSadChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"2"} checked={this.state.sad === "2"} onChange={this.handleSadChange} />
                    <span></span>
                  </label>
                </td>
              </tr>

              <tr>
                <td className="space">Nervös eller klängig i nya situationer, blir lätt otrygg</td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"0"} checked={this.state.nervous === "0"} onChange={this.handleNervousChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"1"} checked={this.state.nervous === "1"} onChange={this.handleNervousChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"2"} checked={this.state.nervous === "2"} onChange={this.handleNervousChange} />
                    <span></span>
                  </label>
                </td>
              </tr>     

              <tr>
                <td className="space">Rädd för mycket, är lättskrämd</td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"0"} checked={this.state.scared === "0"} onChange={this.handleScaredChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"1"} checked={this.state.scared === "1"} onChange={this.handleScaredChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"2"} checked={this.state.scared === "2"} onChange={this.handleScaredChange} />
                    <span></span>
                  </label>
                </td>
              </tr>

              <tr>
                <td className="space">Låg tillit till egen förmåga avseende skolarbete</td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"0"} checked={this.state.trust === "0"} onChange={this.handleTrustChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"1"} checked={this.state.trust === "1"} onChange={this.handleTrustChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"2"} checked={this.state.trust === "2"} onChange={this.handleTrustChange} />
                    <span></span>
                  </label>
                </td>
              </tr>

              <tr>
                <td className="space">Undvikande av situationer som innebär prestation/rädsla för att misslyckas</td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"0"} checked={this.state.fail === "0"} onChange={this.handleFailChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"1"} checked={this.state.fail === "1"} onChange={this.handleFailChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"2"} checked={this.state.fail === "2"} onChange={this.handleFailChange} />
                    <span></span>
                  </label>
                </td>
              </tr>

              <tr>
                <td className="space">Oro inför redovisningar</td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"0"} checked={this.state.reports === "0"} onChange={this.handleReportsChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"1"} checked={this.state.reports === "1"} onChange={this.handleReportsChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"2"} checked={this.state.reports === "2"} onChange={this.handleReportsChange} />
                    <span></span>
                  </label>
                </td>
              </tr>   

              <tr>
                <td className="space">Provångest</td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"0"} checked={this.state.tests === "0"} onChange={this.handleTestsChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"1"} checked={this.state.tests === "1"} onChange={this.handleTestsChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"2"} checked={this.state.tests === "2"} onChange={this.handleTestsChange} />
                    <span></span>
                  </label>
                </td>
              </tr>

              <tr>
                <td className="space">Oro att göra fel</td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"0"} checked={this.state.wrong === "0"} onChange={this.handleWrongChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"1"} checked={this.state.wrong === "1"} onChange={this.handleWrongChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"2"} checked={this.state.wrong === "2"} onChange={this.handleWrongChange} />
                    <span></span>
                  </label>
                </td>
              </tr>

             </tbody>
            </table>

          <table>
            <tbody>
              <tr>
                <th></th>
                <th>Nej</th>
                <th>Ja, små svårigheter</th>
                <th>Ja, klara svårigheter</th>
                <th>Ja, allvarliga svårigheter</th>
              </tr>

              <tr>
                <td className="space">Sammantaget, tycker du att detta barn har svårigheter på ett eller flera av följande områden: Med känslor, koncentration, beteende eller med att komma överens med andra människor?</td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"0"} checked={this.state.difficulties === "0"} onChange={this.handleDifficultiesChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"1"} checked={this.state.difficulties === "1"} onChange={this.handleDifficultiesChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"2"} checked={this.state.difficulties === "2"} onChange={this.handleDifficultiesChange} />
                    <span></span>
                  </label>
                </td>
                <td>
                  <label className="radio">
                    <input type="radio" value={"3"} checked={this.state.difficulties === "3"} onChange={this.handleDifficultiesChange} />
                    <span></span>
                  </label>
                </td>                
              </tr>

            </tbody>
          </table>           


          {this.showMoreDifficulties()}

         
                
            <button type="submit">Lägg till</button>
          </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentFeelingsInfo);