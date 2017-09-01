//Node Modules
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Menu, Segment, Header, Container, Transition, Form } from 'semantic-ui-react'

//Local Modules
import {deleteStudent} from '../../reducers'


class SingleStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Profile',
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

  handleNameChange(event) {
    this.setState({
      selectedStudentName: event.target.value
    })
  }

  handleEmailChange(event) {
    this.setState({
      selectedStudentEmail: event.target.value
    })
  }
  
  render() {
    let formName = this.state.selectedStudentName ? this.state.selectedStudentName : this.props.selectedStudent.name;
    let formEmail = this.state.selectedStudentEmail ? this.state.selectedStudentEmail : this.props.selectedStudent.email;
    let unedited = this.state.selectedStudentName || this.state.selectedStudentEmail ? false : true;

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
                <p>{this.props.selectedStudent.name}</p>
            </Segment>
            <Segment vertical>
                <Header as='h5'>Email</Header>
                <p>{this.props.selectedStudent.email}</p>
            </Segment>
            <Segment vertical>
                <Header as='h5'>Assigned Campus</Header>
                <Link to={`/campuses/${this.props.selectedStudent.campusName}`}>
                  <p>{this.props.selectedStudent.campusName}</p>
                </Link>
            </Segment>
          </Container>
        </Transition>

        <Transition visible={this.state.activeItem === 'Edit'} animation='scale' duration={10}>
          <Form onSubmit={this.props.handleSubmit}>
            <Form.Group>
            <Container>
              <Segment vertical>
                <Form.Input label='Name' placeholder='Name' value={formName} onChange={this.handleNameChange} />
              </Segment>
              <Segment vertical>
                <Form.Input label='Email' placeholder='Email' value={formEmail} onChange={this.handleEmailChange} />
              </Segment>
              <Segment vertical>
                  <Header as='h5'>Assigned Campus</Header>
                  <select name="inputCampus" id="inputCampus">
                    {this.props.campuses.map(campus => {
                      return campus.name === this.props.selectedStudent.campusName ?
                      <option value={`${campus.name}`} key={campus.id} selected>{campus.name}</option> :
                      <option value={`${campus.name}`} key={campus.id}>{campus.name}</option>
                    })}
                  </select>
              </Segment>
              <Form.Button disabled={unedited} content='Submit' onClick={() => this.props.handleSubmit(this.state.selectedStudentName, this.state.selectedStudentEmail)} />
            </Container>
            </Form.Group>
          </Form>
        </Transition>
      </div>
    )
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    campuses: state.campuses,
    selectedStudent: state.students.filter(student => student.id == ownProps.match.params.studentid)[0],
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
    handleSubmit: (selectedStudentName, selectedStudentEmail) => {
      console.log('selectedStudentName = ', selectedStudentName)
      console.log('selectedStudentEmail = ', selectedStudentEmail)
    }
  }
}

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
export default SingleStudentContainer;
