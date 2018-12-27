// TO DO: make local state for form an object
// TO DO: make instances anything but an input box

import React, { Component } from 'react';
import axios from 'axios';

class GoalPage extends Component {
  /* Global Variables */
  state = {
    title: '',
    instances: '',
    goalsList: [],
  }

  /* Life Cycle Events */
  componentDidMount = () => {
    this.getGoals();
  }

  /* Custom Events */

  // Save the input
  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  handleChangeInstances = (event) => {
    this.setState({ instances: event.target.value });
  }

  // Send the input to the database
  handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/api/goal', { title: this.state.title, instances: this.state.instances })
      .then(this.handleSubmitSuccess)
      .catch(this.handleSubmitError);
  }

  // handleSubmit goal Success
  handleSubmitSuccess = () => {
    this.setState({ title: '', instances: '' });
    this.getGoals();
  }

  // handleSubmit goal Error
  handleSubmitError = error => console.log('Error in adding goal:', error);

  // Retrieve goals
  getGoals = () => {
    axios.get('/api/goal')
      .then(this.getGoalsSuccess)
      .catch(this.getGoalsError);
  }

  // Retrieve goals Success
  getGoalsSuccess = (response) => {
    this.setState({ goalsList: response.data });
  }

  // Retrieve goals Error
  getGoalsError = (error) => {
    console.log('Error in retrieving goals from server:', error);
  }

  /* Render Page Content */

  render() {
    return (
      <div>
        <h1>Goal Page</h1>
        {/* Add Goal */}
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="goal" onChange={this.handleChangeTitle} value={this.state.title} />
          <input type="text" placeholder="instances per week" onChange={this.handleChangeInstances} value={this.state.instances} />
          <input type="submit" />
        </form>

        {/* View Goals */}
        {/* <input type='radio'></input> */}
        <ul>
          {this.state.goalsList.map(goal => (
            <li key={goal.id}>{goal.name}: {goal.instances} per week</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default GoalPage;
