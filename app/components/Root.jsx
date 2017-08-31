//Node Modules
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Local Modules

/** utils **/
import {fetchCampuses, fetchStudents} from '../reducers';
import store from '../store';

/** Components **/
import Nav from './Nav';
import Home from './Home';
import Campuses from './Campus/Campuses';
import AddCampus from './Campus/AddCampus';
import SingleCampus from './Campus/SingleCampus';
import AddStudent from './Student/AddStudent';
import Students from './Student/Students';
import SingleStudent from './Student/SingleStudent';

export default class Root extends Component {

  componentDidMount() {
    const studentsThunk = fetchStudents();
    const campusesThunk = fetchCampuses();
    store.dispatch(studentsThunk);
    store.dispatch(campusesThunk);
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Route path="/" component={Nav} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Campuses" component={Campuses} />
            <Route exact path="/Campuses/AddCampus" component={AddCampus} />
            <Route exact path="/Campuses/:CampusName" component={SingleCampus} />
            <Route exact path="/Students/" component={Students} />
            <Route exact path="/Students/AddStudent" component={AddStudent} />
            <Route exact path="/Students/:StudentName" component={SingleStudent} />
          </Switch>
        </div>
      </Router>
    )
  }
}
