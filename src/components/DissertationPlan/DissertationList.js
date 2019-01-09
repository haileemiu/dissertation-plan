import React, { Component } from 'react';
import axios from 'axios';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import Section from './Section';

/*
This is the child component of DissertationPlan
And the parent component of Section
*/
class DissertationList extends Component {
  state = {
    dissertationPlanList: [], // Holds all the sections and steps
  };

  componentDidMount = () => {
    this.getDissertationPlan();
  }

  /* Custom Events */

  // Handles retrieving dissertation plan //
  getDissertationPlan = () => {
    axios.get('/api/dissertation')
      .then(this.getDissertationPlanSuccess)
      .catch(this.getDissertationPlanError);
  }

  // On Success of getDissertationPlan
  getDissertationPlanSuccess = (response) => {
    this.setState({ dissertationPlanList: response.data });
  }

  // On Error of getDissertationPlan
  getDissertationPlanError = (err) => {
    console.log('Error in retrieving sections from api:', err);
    alert('Error in getting your saved sections');
  }

  render() {
    return (
      <div>
        {/* List is a Material UI component type */}
        <List
          component="nav"
          subheader={<ListSubheader component="div">My Plan</ListSubheader>}
        >
          {this.state.dissertationPlanList.map(section => <Section section={section} getDissertationPlan={this.getDissertationPlan} />)}
        </List>
      </div>
    );
  }
}

export default DissertationList;
