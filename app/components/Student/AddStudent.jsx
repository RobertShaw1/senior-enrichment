import React, { Component } from 'react';
import store from '../../store';
import {createStudent, editStudentName, editStudentEmail, fetchCampuses} from '../../reducers'

export default class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsusbscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
     const fetchCampusesThunk = fetchCampuses();
     store.dispatch(fetchCampusesThunk);
  }

  handleNameChange(event) {
    let studentName = event.target.value;
    store.dispatch(editStudentName(studentName))
  }

  handleEmailChange(event) {
    let studentEmail = event.target.value;
    store.dispatch(editStudentEmail(studentEmail))
  }

  handleSubmit(event) {
    event.preventDefault();

    const name = event.target.inputName.value;
    const email =  event.target.inputEmail.value;
    const assignedCampus = event.target.inputCampus.value;

    const createStudentThunk = createStudent(name, email, assignedCampus);
    store.dispatch(createStudentThunk);

    event.target.inputName.value = '';
    event.target.inputEmail.value = '';
  }

  componentWillUnmount() {
    this.unsusbscribe();
  }

  render() {

    const campuses = this.state.campuses;

    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="col-sm-2 control-label">Student Name</label>
          <div className="col-sm-10">
            <input className="form-control" name="inputName" placeholder="Student Name" onChange={this.handleNameChange} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" name="inputEmail" placeholder="Email" onChange={this.handleEmailChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label">Assigned Campus</label>
          <select name="inputCampus" id="inputCampus">
            {campuses.map(campus => <option value={`${campus.name}`} key={campus.id}>{campus.name}</option>)}
          </select>
        </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">Add Student</button>
            </div>
          </div>
      </form>
    )
  }
}
