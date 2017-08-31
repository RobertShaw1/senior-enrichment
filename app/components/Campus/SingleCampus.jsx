//Node Modules
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Button, Grid, Image, List, Transition } from 'semantic-ui-react'
import faker from 'faker';

//Local Modules
import {createStudent, destroyStudent, fetchStudents, fetchCampuses} from '../../reducers';


class SingleCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      campusName: this.props.match.params.CampusName,
      selectedCampusStudents: this.props.students.filter(student => student.campusName === this.props.match.params.CampusName),
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.showForm = this.showForm.bind(this);
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

  showForm() {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    return(
      <div>
        <Grid.Column width={8} className='addStudentByCampus'>
          <Button
            content={this.state.visible ? 'Finished Adding Students' : 'Add a Student'}
            basic={this.state.visible ? false : true}
            color="teal"
            onClick={this.showForm}
            fluid
          />
        </Grid.Column>
        <Transition visible={this.state.visible} animation='drop' duration={600}>
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
                <option value={`${this.props.match.params.CampusName}`}>{this.props.match.params.CampusName}</option>)
              </select>
            </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" className="btn btn-default">Add Student</button>
                </div>
              </div>
          </form>
        </Transition>
        <h1> Hit the single campus route for {this.state.campusName}! </h1>
        <List divided verticalAlign='middle'>
          {this.state.selectedCampusStudents.map(student => {
            let path = `/students/${student.name}`
            return (
              <List.Item key={student.id}>
                <List.Content floated='right'>
                  <Button color='red' size='small' onClick={this.props.deleteStudent}name={student.name}>Delete Student
                    </Button>
                </List.Content>
                <Image avatar src={faker.image.avatar()} />
                <List.Content>
                  <Link to={`${path}`}>
                    <h4>
                      {student.name}
                    </h4>
                  </Link>
                    <span>{student.email}</span>
                </List.Content>
              </List.Item>
            )
          })}
        </List>
        <Button className='deleteCampus' color='red' fluid>Delete Campus</Button>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    students: state.students,
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    deleteStudent: event => {
      event.preventDefault();
      const studentName = event.target.name;
      const destroyStudentThunk = destroyStudent(studentName);
      dispatch(destroyStudentThunk);
      alert(`The Student ${studentName} was deleted!`)
    },
    handleSubmit: (event) => {
      event.preventDefault();
  
      const name = event.target.inputName.value;
      const email =  event.target.inputEmail.value;
      const assignedCampus = event.target.inputCampus.value;
  
      const createStudentThunk = createStudent(name, email, assignedCampus);
      dispatch(createStudentThunk);
  
      event.target.inputName.value = '';
      event.target.inputEmail.value = '';
    },
  }
}

const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
export default SingleCampusContainer;
