import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoginPage extends Component {
  state = {
    usernameOrEmail: '', // WIP (down the line)
    password: '',
  };

  login = (event) => {
    event.preventDefault();
    // Check for existence
    if (this.state.usernameOrEmail && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          usernameOrEmail: this.state.usernameOrEmail,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login} className="customForm">
          <h1>Login</h1>
          <div>
            <label htmlFor="usernameOrEmail">
            {/* WIP */}
              Username OR Email:
              <input
                type="text"
                name="usernameOrEmail"
                value={this.state.usernameOrEmail}
                onChange={this.handleInputChangeFor('usernameOrEmail')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}>
            Register
          </button>
        </center>

        {/* WIP */}
        <a href="http://localhost:3000/url#/password-reset">Forgot password?</a>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
