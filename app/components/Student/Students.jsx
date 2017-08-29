//Node Modules
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import faker from 'faker';

//Local Modules
import {destroyStudent} from '../../reducers';

function Students(props) {
  const {students} = props;

  return (
    <div>
      <Link to="/Students/AddStudent">
        <button className="addStudent">ADD A STUDENT</button>
      </Link>
      <h3>STUDENTS</h3>
      <Card.Group >
        {students.map(student => {
          let path = `/students/${student.name}`
          let studentCampus = student.campusName ? student.campusName : '';
          return (
            <Card key={`${student.name}`} id={`${student.name}`}>
              <Card.Content>
                <Link to={`${path}`}>
                <h3>
                  {student.name}
                </h3>
                  <Image floated='left' size='tiny' src={faker.image.avatar()} />
                </Link>
                <h4> Campus: <Link to={`/Campuses/${student.campusName}`}>{` ${studentCampus}`}</Link></h4>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Link to={`${path}`}>
                    <Button basic color='green'>Update Student</Button>
                  </Link>
                  <Button basic color='red' onClick={props.deleteStudent}name={student.name}>Delete Student
                  </Button>
                </div>
              </Card.Content>
            </Card>
          )
        })}
      </Card.Group>
    </div>
  )
}

const mapStateToProps = function(state) {
  return {
    students: state.students,
  };
}

const mapDispatchToProps = function(dispatch) {
  return {
     
    deleteStudent: event => {
      event.preventDefault();
      // console.log('event.target = ', event.target)
      const studentName = event.target.name;
    
      const destroyStudentThunk = destroyStudent(studentName);
      dispatch(destroyStudentThunk);
      alert(`The Student ${studentName} was deleted!`)
    }
  };
}

const StudentsContainer = connect(mapStateToProps, mapDispatchToProps)(Students);

export default StudentsContainer;
