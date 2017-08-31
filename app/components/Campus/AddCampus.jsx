import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createCampus} from '../../reducers'

class AddCampus extends Component {
  constructor(props) {
    super(props);
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
  
      event.target.inputCampusName.value = '';
      event.target.inputCampusImage.value = '';
    }
  }
}

const AddCampusContainer = connect(mapStateToProps, mapDispatchToProps)(AddCampus)
export default AddCampusContainer;
