import React, { Component } from 'react';
import axios from 'axios';

class GoalPage extends Component {
  /* Global Variables */
  state = {
    title: '',
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

  // Send the input to the router query
  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/goal', { title: this.state.title })
      .then(this.handleSubmitSuccess)
      .catch(this.handleSubmitError);
  }

  // handleSubmit goal Success
  handleSubmitSuccess = response => console.log(response.data); // WIP

  // handleSubmit goal Error
  handleSubmitError = error => console.log('Error in adding goal:', error);


  // Retrieve goals
  getGoals = () => {
    axios.get('/api/goal')
      .then(this.getGoalsSuccess)
      .catch(this.getGoalsError);
  }

  // Retrieve goals Success
  getGoalsSuccess = (response) => { console.log(response.data) }

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
          <input type="text" onChange={this.handleChangeTitle} />
          <input type="submit" />
        </form>

        {/* View Goals */}
        {/* <input type='radio'></input> */}
        <ul></ul>
      </div>
    );
  }
}

export default GoalPage;
