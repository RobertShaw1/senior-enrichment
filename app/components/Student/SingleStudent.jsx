//Node Modules
import React, { Component } from 'react';
import axios from 'axios';

//Local Modules
import store from '../../store';
import {deleteStudent} from '../../reducers'

export default class SingleStudent extends Component {
  constructor(props) {
    super(props);
    this.deleteStudent = this.deleteStudent.bind(this);
  }

  componentDidMount() {
    this.unsusbscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  deleteStudent(event) {
    // event.preventDefault();
    const studentName = this.props.match.params.StudentName;
    // console.log('studentName: ', studentName)
  //   console.log('event.target: ', event.target)
  //   console.log('event.target.querySelector: ', event.target.querySelector('#id'))
    //  console.log('inputName: ', event.target.querySelector('#inputName').value)
    //  console.log('inputEmail: ', event.target.querySelector('#inputEmail').value)
    //  console.log('inputCampus: ', event.target.querySelector('#inputCampus').value)
    //  const name = event.target.querySelector('#inputName').value;
    //  const email =  event.target.querySelector('#inputEmail').value;
    //  const assignedCampus = event.target.querySelector('#inputCampus').value;

    axios.delete(`/api/students/${studentName}`)
    .then(() => {
      this.props.history.push('/Students')
    })
    .catch(err => {
      console.log(err)
    })

    // event.target.querySelector('#inputName').value = '';
    // event.target.querySelector('#inputEmail').value = '';
    // event.target.querySelector('#inputCampus').value = '';
  }

  componentWillUnmount() {
    this.unsusbscribe();
  }

  render() {
    console.log('props: ', this.props)
    const studentName = this.props.match.params.StudentName;

    if(studentName === 'AddStudent') {
      return null
    } else {
      return (
        <div>
          <div>
            {`Student: ${studentName}`}
          </div>
          <button onClick={this.deleteStudent}>
            DELETE STUDENT
          </button>
        </div>
      )
    }
  }
}
