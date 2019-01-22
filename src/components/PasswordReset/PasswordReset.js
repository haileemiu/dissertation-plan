import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
} from '@material-ui/core';

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
    // dialogOpen: false,
  };

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
      //   this.props.dispatch({
      //     type: 'REGISTER_INVITED',
      //     payload: {
      //       password: this.state.password,
      //       ...stringToParams(this.props.location.search)
      //     }
      //   });
      // } else {
      //   this.setState({ dialogOpen: true });
    }
  }

  handleCancel = () => {
    // this.setState({ dialogOpen: false });
  }

  render() {
    const { classes } = this.props;

    return (
      // <MuiThemeProvider theme={theme}>
      <div className={classes.outFrame}>
        <form onSubmit={this.handleSubmit} className={classes.cardFrame}>
          <div className={classes.title}>
            <span>Register</span>
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
      // <Dialog open={this.state.dialogOpen}>
      //   <DialogTitle>Password</DialogTitle>
      //   <DialogContent>
      //     <Typography component="p">Your password doesn't match.</Typography>
      //   </DialogContent>
      //   <DialogActions>
      //     <Button color="primary" onClick={this.handleCancel}>Okay</Button>
      //   </DialogActions>
      // </Dialog>
      // </MuiThemeProvider>
    );
  }
}

PasswordReset.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default (withStyles(styles)(PasswordReset));
