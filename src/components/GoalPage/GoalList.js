import React, { Component } from 'react';
import axios from 'axios';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import GoalType from './GoalType';


/*
This is the child component of GoalList
And the parent component of GoalType
*/
class GoalList extends Component {
  state = {
    goalList: [],
  };

  componentDidMount = () => {
    this.getGoalList();
  }

  getGoalList = () => {
    axios.get('/api/goals')
      .then(this.getGoalListSuccess)
      .catch(this.getGoalListError);
  }

  // On Success of getGoalList
  getGoalListSuccess = (response) => {
    this.setState({ goalList: response.data });
  }

  // On Error of getGoalList
  getGoalListError = (err) => {
    console.log('Error in retrieving goal types:', err);
    // alert('Error in getting your saved sections'); // TO DO: make as user alert
  }

  render() {
    return (
      <div>
        <List
          component="nav"
          subheader={<ListSubheader component="div">My Goals</ListSubheader>}
        >
          {/* TEMP */}
          {/* <pre>{JSON.stringify(this.state.goalList, null, 2)}</pre> */}
          {this.state.goalList.map(type => <GoalType type={type} getGoalList={this.getGoalList} key={type.id} />)}
        </List>
      </div>
    );
  }
}

export default GoalList;
