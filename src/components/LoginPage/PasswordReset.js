import React, { Component } from 'react';

class PasswordReset extends Component {
  state = {
    email: '',
  }

  inputEmail = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitEmail = (event) => {
    event.preventDefault();
    console.log('submitted', this.state.email);
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
