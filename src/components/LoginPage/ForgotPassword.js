import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2';

class ForgotPassword extends Component {
  state = {
    email: '',
  }

  // Holds input value
  inputEmail = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // Checks if email exists
  submitEmail = (event) => {
    event.preventDefault();
    Swal.fire('Email has been sent.');
    axios.get(`/api/forgot-password?email=${this.state.email}`)
      .then(this.submitEmailSuccess)
      .catch(this.submitEmailError);
  }

  submitEmailSuccess = () => {
    this.setState({ email: '' });
  };

  submitEmailError = (err) => {
    console.log('Error in sending email:', err); // TO DO: user alert
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


export default ForgotPassword;
