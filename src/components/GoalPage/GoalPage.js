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

  // Takes in the content of the goal input box
  handleChangeGoal = (event) => {
    this.setState({ goal: event.target.value });
  }

  // Takes in the content of the instances per week input box
  handleChangeInstances = (event) => {
    this.setState({ instancesPerWeek: event.target.value });
  }

  // Handles sending the form information to the api to be stored in the database
  handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/api/goal', { goal: this.state.goal, instancesPerWeek: this.state.instancesPerWeek })
      .then(this.handleSubmitSuccess)
      .catch(this.handleSubmitError);
  }

  // On Success of handleSubmit
  handleSubmitSuccess = () => {
    this.setState({ goal: '', instancesPerWeek: '' }); // Empties out the input boxes as well as the local state
    alert('Goal Added');
    this.getGoals(); // Calls the getGoals function to update the DOM
  }

  // On Error of handleSubmit
  handleSubmitError = (error) => {
    console.log('Error in adding goal:', error);
    alert('Error in adding goal');
  };

  // Handles retrieving goals from the database
  getGoals = () => {
    axios.get('/api/goal')
      .then(this.getGoalsSuccess)
      .catch(this.getGoalsError);
  }

  // On Success of getGoals
  getGoalsSuccess = (response) => {
    this.setState({ goalsList: response.data }); // Adds the list of goals retrieved to the local state
  }

  // On Error of getGoals
  getGoalsError = (error) => {
    console.log('Error in retrieving goals from api:', error);
    alert('Error in getting your saved goals');
  }

  // Handles saving a date on button click
  completedGoal = goalId => () => {
    axios.post(`/api/history?goalId=${goalId}`) // query string to send the goal_id to the api
      .then(this.completedGoalSuccess)
      .catch(this.completedGoalError);
  }

  // On Success of completedGoal
  completedGoalSuccess = (response) => {
    console.log('completedGoalSuccess:', response);
    alert('Saved completed goal');
    // TO DO:
    // Update the DOM to show number of instances
  }

  // On Error of completedGoal
  completedGoalError = (error) => {
    console.log('completedGoalError:', error);
    alert('Error with saving instance of completed goal');
  }


  /* Render Page Content */

  render() {
    return (
      <div>
        <h1>Goal Page</h1>

        {/* Form to add a goal */}
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="goal" onChange={this.handleChangeGoal} value={this.state.goal} />
          <input type="text" placeholder="instances per week" onChange={this.handleChangeInstances} value={this.state.instancesPerWeek} />
          <input type="submit" />
        </form>

        {/* List of goals */}
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
