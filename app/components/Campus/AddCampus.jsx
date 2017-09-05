import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createCampus} from '../../reducers'

class AddCampus extends Component {
  constructor(props) {
    super(props);

    // Do you even need this state? You don't appear to use it anywhere
    this.state = {
      campusName: '',
    }

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      campusName: event.target.value
    })
  }


  render() {
    return (
      <form className="form-horizontal" onSubmit={this.props.handleSubmit}>
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


const mapStateToProps = null;

const mapDispatchToProps = function(dispatch) {
  return {
    handleSubmit: event => {
      event.preventDefault();

      const name = event.target.inputCampusName.value;
      const image = event.target.inputCampusImage.value;

      const createCampusThunk = createCampus(name, image);
      dispatch(createCampusThunk);

      // No need to do this. Good thought, though.
      // Had our inputs been controlled fields, meaning that they have an attribute of
      // value={this.state.name}, then we would have needed to to have done a
      // this.setState({name: ""})
      // But we aren't using state anywhere in this component.
      event.target.inputCampusName.value = '';
      event.target.inputCampusImage.value = '';
    }
  }
}

const AddCampusContainer = connect(mapStateToProps, mapDispatchToProps)(AddCampus)
export default AddCampusContainer;
