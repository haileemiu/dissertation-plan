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
import { timingSafeEqual } from 'crypto';

const styles = () => ({});

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
    email: stringToParams(window.location.href).email,
    password: '',
    confirmPassword: '',
    key: stringToParams(window.location.href).key,
    activeKey: false,
    // dialogOpen: false,
  };

  // WIP
  componentDidMount() {
    this.checkResetLink();
  }

  // WIP
  // This will check if the temp_key and temp_key_active=true
  checkResetLink = () => {
    console.log('this.state.key:', this.state.key);
    axios.get(`/api/password-reset?key=${this.state.key}`)
      .then(this.checkResetLinkSuccess)
      .catch(this.checkResetLinkError);
  }

  checkResetLinkSuccess = (response) => {
    console.log('Response of active:', response.data);
    // TO DO: render that stop inputs from showing
    this.setState({ activeKey: response.data });
    console.log('state:', this.state.activeKey);
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
      axios.put('/api/password-reset', { email: this.state.email, password: this.state.password })
        .then(console.log('success'))
        .catch((err) => {
          console.log('Error in updating password:', err);
        });
    }
  }

  handleCancel = () => {
    // this.setState({ dialogOpen: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        {this.state.activeKey
          ? (
            <div className={classes.outFrame}>
              <form onSubmit={this.handleSubmit} className={classes.cardFrame}>
                <div className={classes.title}>
                  <span>Reset Password</span>
                </div>
                <div className={classes.subBackground}>
                  <div className={classes.inputDiv}>
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
                  </div>
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
