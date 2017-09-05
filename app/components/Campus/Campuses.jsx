//Node Modules
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import faker from 'faker';


function Campuses(props) {
  const {campuses, students} = props;

  return (
    <div>
      <Link to="/Campuses/AddCampus">
        <button className="addCampus">ADD A CAMPUS</button>
      </Link>

      {/* Nice job using this library! Looks great!*/}
      <Card.Group >
        {campuses.map(campus => {
          let path = `/Campuses/${campus.name}`
          let campusImg = campus.image ? campus.image : faker.image.city();
          let campusStudents = students.filter(student => student.campusName === campus.name).length;
          return (
            <Card key={campus.id}>
              <Link to={`${path}`}>
                <Image src={campusImg} />
              </Link>
                <Card.Content>
                  <Card.Header>
                    <Link to={`${path}`}>
                      {campus.name}
                    </Link>
                  </Card.Header>
                <Card.Meta>
                  <span className='date'>
                    Established 2017
                  </span>
                </Card.Meta>
                <Card.Description>
                  Specialty is CSS
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a className='ui floated-right'>
                  <Icon name='user' />
                  {campusStudents ? campusStudents : 'No '} Students
                </a>
                <Link to={`${path}`}>
                  <Button size='mini' floated='right' color='blue'>
                    View Campus Info
                  </Button>
                </Link>
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
    campuses: state.campuses,
    students: state.students,
  }
}

const CampusesContainer = connect(mapStateToProps)(Campuses);
export default CampusesContainer;
