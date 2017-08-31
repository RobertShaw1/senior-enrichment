import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createStudent} from '../../reducers'

class AddStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentName: '',
      studentEmail: '',
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      studentName: event.target.value
    })
  }

  handleEmailChange(event) {
    this.setState({
      studentEmail: event.target.value
    })
  }

  render() {

    const campuses = this.props.campuses;

    return (
      <form className="form-horizontal" onSubmit={this.props.handleSubmit}>
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

const mapStateToProps = function(state) {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    handleSubmit: (event) => {
      event.preventDefault();
  
      const name = event.target.inputName.value;
      const email =  event.target.inputEmail.value;
      const assignedCampus = event.target.inputCampus.value;
  
      const createStudentThunk = createStudent(name, email, assignedCampus);
      dispatch(createStudentThunk);
  
      event.target.inputName.value = '';
      event.target.inputEmail.value = '';
    }
  }
}

const AddStudentContainer = connect(mapStateToProps, mapDispatchToProps)(AddStudent)

export default AddStudentContainer;

