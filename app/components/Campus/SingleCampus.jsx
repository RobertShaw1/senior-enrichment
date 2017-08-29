//Node Modules
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button, Image, List } from 'semantic-ui-react'
import faker from 'faker';

//Local Modules
import store from '../../store';
import {fetchStudents, destroyStudent} from '../../reducers';

let campusName;

export default class SingleCampus extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.deleteStudent = this.deleteStudent.bind(this);
  }
  
  componentDidMount() {
    this.unsusbscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
    
    campusName = this.props.match.params.CampusName;
    
    const fetchStudentsThunk = fetchStudents(campusName);
    store.dispatch(fetchStudentsThunk);
  }

  deleteStudent(event) {
    event.preventDefault();
    // console.log('event.target = ', event.target)
    const studentName = event.target.name;

    const destroyStudentThunk = destroyStudent(studentName);
    store.dispatch(destroyStudentThunk);
    alert(`The Student ${studentName} was deleted!`)
  }

  componentWillUnmount() {
    this.unsusbscribe();
  }

  render() {
    campusName = this.props.match.params.CampusName;
    let selectedCampusStudents = this.state.selectedCampusStudents;
    return (
      <div>
        <h1> Hit the single campus route for {campusName}! </h1>
        <List divided verticalAlign='middle'>
          {selectedCampusStudents.map(student => {
            let path = `/students/${student.name}`
            return (
              <List.Item key={student.id}>
                <List.Content floated='right'>
                  <Button color='red' size='small' onClick={this.deleteStudent}name={student.name}>Delete Student
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
      </div>
    )
  }
}
