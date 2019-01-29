import React, { Component } from 'react';
import axios from 'axios';

// import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import GoalType from './Type/GoalType';
import AddNewSectionButton from './Type/AddNewSectionButton';
import AddNewSectionInput from './Type/AddNewSectionInput';


/*
Child component of GoalPage
Parent component of GoalType, AddNewSectionInput, and AddNewSectionButton
*/
class GoalList extends Component {
  state = {
    goalList: [],
    isAdding: false,
  };

  componentDidMount = () => {
    this.getGoalList();
  }

  getGoalList = () => {
    axios.get('/api/goals/types')
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

  toggleAddSection = () => {
    this.setState(prevState => ({ isAdding: !prevState.isAdding }));
  }

  render() {
    return (
      <div>
        <List
          component="nav"
          // subheader={<ListSubheader component="div">My Goals</ListSubheader>}
        >
          {/* List out the Goal Type headers */}
          {this.state.goalList.map(type => (
            <GoalType
              type={type}
              getGoalList={this.getGoalList}
              key={type.id}
            />))}

          {/* Add section button bottom of list */}
          {/* Toggle between Add Section Button & Add Section input */}
          {this.state.isAdding
            ? <AddNewSectionInput toggleAddSection={this.toggleAddSection} getGoalList={this.getGoalList} />
            : <AddNewSectionButton toggleAddSection={this.toggleAddSection} />}
        </List>
      </div>
    );
  }
}

export default GoalList;
