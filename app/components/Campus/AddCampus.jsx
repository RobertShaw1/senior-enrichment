import React, { Component } from 'react';
import store from '../../store';
import {createCampus, editCampusName} from '../../reducers'

export default class AddCampus extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsusbscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  handleNameChange(event) {
    let campusName = event.target.value;
    store.dispatch(editCampusName(campusName))
  }

  handleSubmit(event) {
    event.preventDefault();

    const name = event.target.inputCampusName.value;
    const image = event.target.inputCampusImage.value;

    const createCampusThunk = createCampus(name, image);
    store.dispatch(createCampusThunk);

    event.target.inputCampusName.value = '';
    event.target.inputCampusImage.value = '';
  }

  componentWillUnmount() {
    this.unsusbscribe();
  }

  render() {
    // const campuses = this.state.campuses;
    // ---> can also be expressed as const {campuses} = this.state

    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="col-sm-2 control-label">Campus Name</label>
          <div className="col-sm-10">
            <input className="form-control" placeholder="Campus Name" name="inputCampusName" onChange={this.handleNameChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">Image</label>
          <div className="col-sm-10">
            <input className="form-control" placeholder="Image" name="inputCampusImage" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default">Add Campus</button>
          </div>
        </div>
      </form>
    )
  }
}
