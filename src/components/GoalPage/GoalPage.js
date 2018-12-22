import React, { Component } from 'react';
import axios from 'axios';

class GoalPage extends Component {

  state = {
    title: ''
  }

  // Save the input
  handleChangeTitle = (event) => {
    this.setState({title: event.target.value})
  }

  // Send the input to the router query
  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/goal', {title: this.state.title})
      .then(res => {
        // WIP
        console.log(res.data);
      })
  }

  render() {
    return (
      <div>
        <h1>Goal Page</h1>
        {/* Add Goal */}
        <form onSubmit={this.handleSubmit}>
          <input type='text' onChange={this.handleChangeTitle}></input>
          <input type='submit'></input>
        </form>

        {/* View Goals */}
        <ul>
          {/* <input type='radio'></input> */}
          <li>test</li>
        </ul>
      </div>
    )
  }

}

export default GoalPage;
