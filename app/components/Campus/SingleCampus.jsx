//Node Modules
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Button, Image, List } from 'semantic-ui-react'
import faker from 'faker';

//Local Modules
import {destroyStudent} from '../../reducers';


function SingleCampus(props) {
  let campusName = props.match.params.CampusName;
  let selectedCampusStudents = props.students.filter(student => student.campusName === campusName)

  return (
    <div>
      <h1> Hit the single campus route for {campusName}! </h1>
      <List divided verticalAlign='middle'>
        {selectedCampusStudents.map(student => {
          let path = `/students/${student.name}`
          return (
            <List.Item key={student.id}>
              <List.Content floated='right'>
                <Button color='red' size='small' onClick={props.deleteStudent}name={student.name}>Delete Student
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
  }
}

const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
export default SingleCampusContainer;
