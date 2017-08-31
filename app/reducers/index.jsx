// import { combineReducers } from 'redux'
import axios from 'axios';


//ACTION TYPES
const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

const GET_ALL_CAMPUSES = 'GET_ALL_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';


//ACTION CREATORS
export const getStudents = function (students) {
	return {
	type: GET_ALL_STUDENTS,
  students: students
	};
};

export const addStudent = function (student) {
	return {
	type: ADD_STUDENT,
	student: student
	};
};

export const deleteStudent = function (deletedStudent) {
	return {
	type: DELETE_STUDENT,
	deletedStudent: deletedStudent
	};
};

export const getCampuses = function (campuses) {
	return {
	type: GET_ALL_CAMPUSES,
	campuses: campuses
	};
};

export const addCampus = function (campus) {
	return {
	type: ADD_CAMPUS,
	campus: campus
	};
};


//THUNK CREATORS
export const fetchStudents = function() {

  //THUNK
  return function thunk(dispatch, getState) {
    axios.get('/api/students')
    .then(res => res.data)
    .then(students => {
      const getStudentsAction = getStudents(students)
      dispatch(getStudentsAction);
    })
  }
}

export const fetchCampuses = function() {

  //THUNK
  return function thunk(dispatch, getState) {
    axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => {
      const getCampusesAction = getCampuses(campuses)
      dispatch(getCampusesAction);
    })
  }
}

export const createCampus = function(name, image) {

  //THUNK
  return function thunk(dispatch, getState) {
    axios.post('/api/campuses/addcampus', {name, image})
    .then(res => res.data)
    .then(campus => {
      const addCampusAction = addCampus(campus)
      dispatch(addCampusAction);
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const createStudent = function(name, email, assignedCampus) {

  //THUNK
  return function thunk(dispatch, getState) {
    axios.post('/api/students/addstudent', {name, email, assignedCampus})
    .then(res => res.data)
    .then(student => {
      const addStudentAction = addStudent(student)
      dispatch(addStudentAction);
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const destroyStudent = function(studentName) {
  
  //THUNK
  return function thunk(dispatch, getState) {
    axios.delete(`/api/students/${studentName}`)
    .then(res => res.data)
    .then(deletedStudent => {
      const deleteStudentAction = deleteStudent(deletedStudent)
      dispatch(deleteStudentAction);
    })
    .then(() => {
      let students = getState().students;
      const getStudentsAction = getStudents(students)
      dispatch(getStudentsAction);
    })
    .catch(err => {
      console.log(err)
    })
  }
}


//INITIAL STATE
const initialState = {
  students: [],
  campuses: [],
  campus: {},
  student: {},
  deletedStudent: {},
};


//REDUCER
const rootReducer = function(prevState = initialState, action) {
  const nextState = Object.assign({}, prevState);

  let studentArr;
  let index;

  switch(action.type) {
    case GET_ALL_STUDENTS:
      nextState.students = action.students
      break
    case GET_ALL_CAMPUSES:
      nextState.campuses = action.campuses
      break
    case ADD_CAMPUS:
      nextState.campuses = nextState.campuses.concat(action.campus)
      break
    case ADD_STUDENT:
      nextState.students = nextState.students.concat(action.student)
      break
    case DELETE_STUDENT:
      studentArr = nextState.students.slice();
      index = studentArr.findIndex(student => student.id === action.deletedStudent.id);
      console.log('index = ', index)
      studentArr.splice(index, 1);
      nextState.students = studentArr;
      break
    default: return prevState
  }
  return nextState;
};

export default rootReducer
