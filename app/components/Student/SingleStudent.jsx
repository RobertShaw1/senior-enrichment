//Node Modules
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Menu, Segment, Header, Container, Transition, Form } from 'semantic-ui-react'

//Local Modules
import {deleteStudent} from '../../reducers'


class SingleStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Profile',
      selectedStudent: this.props.students.filter(student => student.name === this.props.match.params.StudentName),
      selectedStudentName: this.props.students.filter(student => student.name === this.props.match.params.StudentName)[0].name,
      selectedStudentEmail: this.props.students.filter(student => student.name === this.props.match.params.StudentName)[0].email,
    }

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleItemClick(e, {name}) {
    this.setState({
      activeItem: name
    })
  }

  handleNameChange(e, {name}) {
    this.setState({
      selectedStudentName: name
    })
  }

  handleEmailChange(e, {email}) {
    this.setState({
      selectedStudentEmail: email
    })
  }

  // handleSumbit() {
  //   const {selectedStudentName, selectedStudentEmail} = this.state;
  //   console.log('selectedStudentName = ', selectedStudentName)
  // }
  
  render() {
    let selectedStudent = this.props.students.filter(student => student.name === this.props.match.params.StudentName)
    console.log('selectedStudent = ', selectedStudent)

    return (
      <div>
        <Menu tabular>
          <Menu.Item name='Profile' value='test' active={this.state.activeItem === 'Profile'} onClick={this.handleItemClick} />
          <Menu.Item name='Edit' active={this.state.activeItem === 'Edit'} onClick={this.handleItemClick} />
        </Menu>

        <Transition visible={this.state.activeItem === 'Profile'} animation='scale' duration={10}>
          <Container>
            <Segment vertical>
                <Header as='h5'>Name</Header>
                <p>{selectedStudent[0].name}</p>
            </Segment>
            <Segment vertical>
                <Header as='h5'>Email</Header>
                <p>{selectedStudent[0].email}</p>
            </Segment>
            <Segment vertical>
                <Header as='h5'>Assigned Campus</Header>
                <p>{selectedStudent[0].campusName}</p>
            </Segment>
          </Container>
        </Transition>

        <Transition visible={this.state.activeItem === 'Edit'} animation='scale' duration={10}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
            <Container>
              <Segment vertical>
                <Header as='h5'>Name</Header>
                <Form.Input placeholder='Name' value={this.state.selectedStudentName} onChange={this.handleNameChange} />   
              </Segment>
              <Segment vertical>
                <Header as='h5'>Email</Header>
                <Form.Input placeholder='Email' value={this.state.selectedStudentEmail} onChange={this.handleEmailChange} />
              </Segment>
              <Segment vertical>
                  <Header as='h5'>Assigned Campus</Header>
                  <select name="inputCampus" id="inputCampus">
                    {this.props.campuses.map(campus => {
                      return campus.name === this.state.selectedStudent[0].campusName ?
                      <option value={`${campus.name}`} key={campus.id} selected>{campus.name}</option> :
                      <option value={`${campus.name}`} key={campus.id}>{campus.name}</option>
                    })}
                  </select>
              </Segment>
              <Segment vertical>
                <Form.Button content='Submit' />
              </Segment>
            </Container>
            </Form.Group>
          </Form>
        </Transition>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    students: state.students,
    campuses: state.campuses,
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

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
export default SingleStudentContainer;
