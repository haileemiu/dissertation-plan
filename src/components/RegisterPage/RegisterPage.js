import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; // WIP
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, InputBase } from '@material-ui/core';

const styles = theme => ({
  root: {
    margin: 'auto',
    marginTop: 20,
    width: '50%',
    border: '1px solid rgb(44, 198, 180)',
    display: 'block',
    padding: 30,
    textAlign: 'center',
  },
  textField: {
    backgroundColor: theme.palette.common.white,
    border: '1px solid #333333',
    borderRadius: 50,
    margin: 10,
    width: '75%',
    padding: 10,
  },
  button: {
    textTransform: 'none',
    backgroundColor: '#58BCD2',
    color: 'white',
    borderRadius: '50px',
    width: '75%',
    height: 50,
  },
});

class RegisterPage extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    passwordRetype: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.email && this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  // To Do: redirect user on successful registration
  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}

        <div style={{ width: '50%', textAlign: 'center', margin: 'auto' }}>
          <h2>Get Started with A Free Account</h2>
          <h3>Keep track of your unique dissertation plan, set goals, connect with peers, access affordable coaching, and stay on track.  Already have an account? Sign in</h3>
        </div>
        <form onSubmit={this.registerUser} className={classes.root}>

          <InputBase
            className={classes.textField}
            type="email"
            placeholder="Email address"
            value={this.state.email}
            onChange={this.handleInputChangeFor('email')}
          />

          <InputBase
            className={classes.textField}
            type="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
          />

          <InputBase
            className={classes.textField}
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
          />
          {/* To Do: Not currently doing anything */}
          <InputBase
            className={classes.textField}
            type="password"
            name="password"
            placeholder="Re-enter password"
            value={this.state.passwordRetype}
            onChange={this.handleInputChangeFor('passwordRetype')}
          />
          {/* TO DO: This is simply a note to the user. Nothing is requiring the password to be a certain length */}
          <p>Note: Passwords must be at least 8 characters in length.</p>
          <Button
            className={classes.button}
            type="submit"
            name="submit"
            value="Register"
          >
            Get Started
          </Button>

        </form>

        {/* <center>
          <button type="button" className="link-button" onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}>Login</button>
        </center> */}
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors,
  user: state.user,
});

const StyledRegisterPage = withStyles(styles)(RegisterPage);

export default connect(mapStateToProps)(StyledRegisterPage);
