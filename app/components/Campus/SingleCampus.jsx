//Node Modules
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Button, Container, Divider, Form, Grid, Header, Icon, Image, List, Menu, Segment, Transition } from 'semantic-ui-react'
import faker from 'faker';

//Local Modules
import {createStudent, destroyStudent} from '../../reducers';


class SingleCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      activeItem: 'Campus Info',
      // selectedCampusStudents: this.props.students.filter(student => student.campusName === this.props.match.params.CampusName),
    }

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.showForm = this.showForm.bind(this);
  }
  

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     selectedCampusStudents: nextProps.students.filter(student => student.campusName === nextProps.match.params.CampusName),
  //   })
  // }

  handleItemClick(e, {name}) {
    
    this.setState({
      activeItem: name === 'Campus Info' || name === 'Edit' ? name : 'Campus Info'
    })
  }

  handleNameChange(event) {
    if(event.target.name === 'inputStudentName') {
      this.setState({
        studentName: event.target.value
      })
    } else {
      this.setState({
        newCampusName: event.target.value
      })
    }
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
    let selectedCampusStudents = this.props.students.filter(student => student.campusName === this.props.campusName);
    let formName = this.state.newCampusName ? this.state.newCampusName : this.props.campusName;
    let unedited = this.state.newCampusName ? false : true;

    return(
      <div>
        <Header as='h1' textAlign='center'>Welcome to the {this.props.campusName} campus!</Header>
        <Grid.Column width={8} className='addStudentByCampus'>
          <Button
            content={this.state.visible ? 'Finished Adding Students' : 'Add a Student'}
            basic={this.state.visible ? false : true}
            color="teal"
            onClick={this.showForm}
            fluid
          />
        </Grid.Column>
        <Transition visible={this.state.visible} animation='drop' duration={500}>
          <form className="form-horizontal" onSubmit={this.props.handleSubmit}>
            <div className="form-group">
              <label className="col-sm-2 control-label">Student Name</label>
              <div className="col-sm-10">
                <input className="form-control" name="inputStudentName" placeholder="Student Name" onChange={this.handleNameChange} />
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
                <option value={`${this.props.campusName}`}>{this.props.campusName}</option>)
              </select>
            </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" className="btn btn-default">Add Student</button>
                </div>
              </div>
          </form>
        </Transition>
        <Divider />

        <Menu tabular>
          <Menu.Item name='Campus Info' value='test' active={this.state.activeItem === 'Campus Info'} onClick={this.handleItemClick} />
          <Menu.Item name='Edit' active={this.state.activeItem === 'Edit'} onClick={this.handleItemClick} />
        </Menu>

        <Grid>
          <Grid.Column width={8}>
          <Transition visible={this.state.activeItem === 'Campus Info'} animation='scale' duration={10}>
            <Container>
              <Segment vertical>
                  <Header as='h5'>Campus Name</Header>
                  <p>{this.props.campusName}</p>
              </Segment>
              <Segment vertical>
                  <Header as='h5'># of Students</Header>
                  <p>{selectedCampusStudents.length} Students</p>
              </Segment>
            </Container>
          </Transition>

          <Transition visible={this.state.activeItem === 'Edit'} animation='scale' duration={10}>
            <Form onSubmit={this.props.handleSubmit}>
              <Form.Group>
              <Container>
                <Segment vertical>
                  <Form.Input name='inputCampusName' label='Campus Name' placeholder='Campus Name' value={formName} onChange={this.handleNameChange} />
                </Segment>
                <Form.Button disabled={unedited} content='Submit' name='button' value={this.props.match.params.studentid} onClick={this.handleItemClick} />
              </Container>
              </Form.Group>
            </Form>
          </Transition>
          </Grid.Column>
          <Grid.Column width={8}>
          <Header as='h5'>Students</Header>
            { selectedCampusStudents.length ? 
              <List divided verticalAlign='middle'>
                {selectedCampusStudents.map(student => {
                  let path = `/students/${student.name}`
                  return (
                    <List.Item key={student.id}>
                      <List.Content floated='right'>
                        <Button basic color='red' size='small' onClick={e => this.props.deleteStudent(e, student)}name={student}>Delete Student
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
              </List> :
              <Container>
                <Header as='h3' color="grey" textAlign='center'>There are no students assigned to this campus.</Header>
                <Header as='h4' color="grey" textAlign='center'>Feel free to a few <Icon name="smile" /></Header>
              </Container>
            }
          </Grid.Column>
        </Grid>
        <Button className='deleteCampus' color='red' fluid onClick={this.props.handleDelete}>Delete Campus</Button>
      </div>
    )
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    students: state.students,
    campusName: ownProps.match.params.CampusName,
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    deleteStudent: (event, student) => {
      event.preventDefault();
    
      const destroyStudentThunk = destroyStudent(student.id);
      dispatch(destroyStudentThunk);
      alert(`The Student ${student.name} was deleted!`)
    },
    handleSubmit: event => {
      event.preventDefault();
  
      const name = event.target.inputName.value;
      const email =  event.target.inputEmail.value;
      const assignedCampus = event.target.inputCampus.value;
  
      const createStudentThunk = createStudent(name, email, assignedCampus);
      dispatch(createStudentThunk);
  
      event.target.inputName.value = '';
      event.target.inputEmail.value = '';
    },
    handleDelete: event => {
      event.preventDefault();
      console.log('hit the delete button!')
    }
  }
}

const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
export default SingleCampusContainer;
