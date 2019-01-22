import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

import {
  Button,
  // Dialog,
  // DialogContent,
  // DialogActions,
  // DialogTitle,
  // Typography,
} from '@material-ui/core';


const styles = () => ({});

// This function breaks down the url to access the email and key
function stringToParams(string) {
  const objectToSend = {};
  let paramArray;
  // Takes a query string and breaks it out into local parameters
  string.replace('?', '&').split('&')
    .forEach((param) => {
      paramArray = param.split('=');
      if (paramArray.length > 1) {
        objectToSend[paramArray[0]] = decodeURIComponent(paramArray[1]); // Decodes escape characters to make email human readable
      }
    });
  return objectToSend;
}


class PasswordReset extends Component {
  state = {
    // email: stringToParams(window.location.href).email,
    password: '',
    confirmPassword: '',
    key: stringToParams(window.location.href).key,
    activeKey: false,
    // dialogOpen: false,
  };

  // When the emailed link takes the user to the page,
  // it will immediately check to see if the link is active.
  componentDidMount() {
    this.checkResetLink();
  }

  // This will check if the temp_key and temp_key_active=true
  checkResetLink = () => {
    console.log('this.state.key:', this.state.key);
    axios.get(`/api/password-reset?key=${this.state.key}`)
      .then(this.checkResetLinkSuccess)
      .catch(this.checkResetLinkError);
  }

  checkResetLinkSuccess = (response) => {
    this.setState({ activeKey: response.data });
  }

  checkResetLinkError = (err) => {
    console.log('Error in resetting password:', err); // TO DO: make as user alert
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.password === this.state.confirmPassword) {
      axios.put('/api/password-reset', { key: this.state.key, password: this.state.password })
        .then(this.handleSubmitSuccess)
        .catch(this.handleSubmitError);
    }
  }

  handleSubmitSuccess = () => {
    console.log('Password changed'); // TO DO: user alert
  }

  handleSubmitError = (err) => {
    console.log('Error in updating password:', err); // TO DO: user alert
  }

  handleCancel = () => {
    // this.setState({ dialogOpen: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        {/* Here is a ternary function that renders the password reset page if the temp_key is active */}
        {/* and renders a message if the key is inactive */}
        {this.state.activeKey
          ? (
            <div className={classes.outFrame}>
              <form onSubmit={this.handleSubmit} className={classes.cardFrame}>
                <div className={classes.title}>
                  <span>Reset Password</span>
                </div>
                <div className={classes.subBackground}>
                  {/* <div className={classes.inputDiv}>
                    <div className={classes.label}>
                      <label>Email</label>
                    </div>
                    <input
                      className={classes.textField}
                      type="text"
                      placeholder="Email Address"
                      name="Email Address"
                      value={this.state.email}
                      onChange={this.handleInputChangeFor('email')}
                      disabled
                      required
                    />
                  </div> */}
                  <div className={classes.inputDiv}>
                    <div className={classes.label}>
                      <label>Password</label>
                    </div>
                    <input
                      className={classes.textField}
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInputChangeFor('password')}
                      required
                    />
                  </div>
                  <div className={classes.inputDiv}>
                    <div className={classes.label}>
                      <label>Confirm Password</label>
                    </div>
                    <input
                      className={classes.textField}
                      type="password"
                      placeholder="Password"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.handleInputChangeFor('confirmPassword')}
                      required
                    />
                  </div>
                  <div className={classes.buttonDiv}>
                    <Button onClick={this.login} variant="contained" type="submit" color="primary">Reset Password</Button>
                  </div>
                </div>
              </form>
            </div>
          )
          : <h1>Your Password Reset Link as expired.</h1>}
      </>
      /* // <MuiThemeProvider theme={theme}>
      
      // <Dialog open={this.state.dialogOpen}>
      //   <DialogTitle>Password</DialogTitle>
      //   <DialogContent>
      //     <Typography component="p">Your password doesn't match.</Typography>
      //   </DialogContent>
      //   <DialogActions>
      //     <Button color="primary" onClick={this.handleCancel}>Okay</Button>
      //   </DialogActions>
      // </Dialog>
      // </MuiThemeProvider> */
    );
  }
}

PasswordReset.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default (withStyles(styles)(PasswordReset));
