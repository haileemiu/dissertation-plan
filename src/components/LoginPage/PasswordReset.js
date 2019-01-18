// WIP
import React, { Component } from 'react';
import axios from 'axios';

class PasswordReset extends Component {
  state = {
    email: '',
  }

  // Holds input value
  inputEmail = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // 1) Checks if email exists
  submitEmail = (event) => {
    event.preventDefault();
    axios.get(`/api/password-reset?email=${this.state.email}`)
      .then(this.submitEmailSuccess)
      .catch(this.submitEmailError);
  }

  submitEmailSuccess = () => {
    this.setState({ email: '' });
    alert('If your email is in our database, you will get a password reset link in your inbox');
  };

  submitEmailError = () => {
    alert('Something went wrong');
  }

  render() {
    return (
      <div>
        <h1>Password Reset</h1>
        <form onSubmit={this.submitEmail}>
          <input
            type="text"
            name="email"
            placeholder="your email"
            value={this.state.email}
            onChange={this.inputEmail}
          />
          <input
            type="submit"
          />

        </form>
      </div>
    );
  }
}


export default PasswordReset;
