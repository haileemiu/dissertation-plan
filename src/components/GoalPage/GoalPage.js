// TO DO: make local state for form an object
// TO DO: make instances anything but an input box

import React, { Component } from 'react';
import axios from 'axios';

class GoalPage extends Component {
  /* Global Variables */
  state = {
    goal: '',
    instancesPerWeek: '',
    goalsList: [],
  }

  /* Life Cycle Events */
  componentDidMount = () => {
    this.getGoals();
  }

  /* Custom Events */

  // Save the input
  handleChangeGoal = (event) => {
    this.setState({ goal: event.target.value });
  }

  handleChangeInstances = (event) => {
    this.setState({ instancesPerWeek: event.target.value });
  }

  // Send the input to the database
  handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/api/goal', { goal: this.state.goal, instancesPerWeek: this.state.instancesPerWeek })
      .then(this.handleSubmitSuccess)
      .catch(this.handleSubmitError);
  }

  // handleSubmit goal Success
  handleSubmitSuccess = () => {
    this.setState({ goal: '', instancesPerWeek: '' });
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

  // onClick save completed goal time/date
  completedGoal = goalId => () => {
    axios.post(`/api/history?goalId=${goalId}`)
      .then(this.completedGoalSuccess)
      .catch(this.completedGoalError);
  }

  // Completed goal Success
  completedGoalSuccess = (response) => { console.log('completedGoalSuccess:', response); }

  // Completed goal Error
  completedGoalError = (error) => { console.log('completedGoalError:', error); }

  /* Render Page Content */

  render() {
    return (
      <div>
        <h1>Goal Page</h1>

        {/* Add Goal */}
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="goal" onChange={this.handleChangeGoal} value={this.state.goal} />
          <input type="text" placeholder="instances per week" onChange={this.handleChangeInstances} value={this.state.instancesPerWeek} />
          <input type="submit" />
        </form>

        {/* View Goals */}
        <ul>
          {this.state.goalsList.map(goal => (
            <li key={goal.id}>
              {goal.goal}: {goal.instances_per_week} times per week
              <button type="button" onClick={this.completedGoal(goal.id)}>Did it!</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default GoalPage;
