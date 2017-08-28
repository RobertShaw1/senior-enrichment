//Node Modules
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import faker from 'faker';

//Local Modules
import store from '../../store';
import {fetchCampuses} from '../../reducers'


export default class Campuses extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsusbscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
    
    const fetchCampusesThunk = fetchCampuses();
    store.dispatch(fetchCampusesThunk);
  }

  componentWillUnmount() {
    this.unsusbscribe();
  }

  render() {
    const campuses = this.state.campuses;
    // ---> can also be expressed as const {students} = this.state

    return (
      <div>
        <Link to="/Campuses/AddCampus">
          <button className="addCampus">ADD A CAMPUS</button>
        </Link>

        <Card.Group >
          {campuses.map(campus => {
            let path = `/Campuses/${campus.name}`
            let campusImg = campus.image ? campus.image : faker.image.city();
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
                    22 Students
                  </a>
                  <Button size='mini' floated='right' color='blue'>
                    Update Campus Info
                  </Button>
                </Card.Content>
              </Card>
            )
          })}
        </Card.Group>
      </div>
    )
  }
}

