import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, InputBase } from '@material-ui/core';
import axios from 'axios';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '60%',
    margin: 'auto',
  },
  textField: {
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    borderRadius: '50px',
    margin: 10,
    width: '400px',
    padding: 10,
  },
  button: {
    textTransform: 'none',
    backgroundColor: '#58BCD2',
    color: 'white',
    borderRadius: '50px',
    float: 'right',
  },
  message: {
    color: 'white',
    fontSize: '20px',
  },

});

/*
Child of CoachingContactPage
*/
class ContactForm extends Component {
  state = {
    name: '',
    email: '',
    study: '',
    stage: '',
    length: '',
    message: '',
  }

  // Handles saving input values in local state
  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // On send message button click
  sendMessage = (event) => {
    event.preventDefault();
    // Swal.fire('Email has been sent.');

    axios.post('/api/coaching/', {
      name: this.state.name,
      email: this.state.email,
      study: this.state.study,
      stage: this.state.stage,
      length: this.state.length,
      message: this.state.message,
    })
      .then(this.sendMessageSuccess)
      .catch(this.sendMessageError);

    this.setState({
      name: '',
      email: '',
      study: '',
      stage: '',
      length: '',
      message: '',
    });
  }

  sendMessageSuccess = (response) => {
    console.log(response); // To Do: add user alert
  }

  sendMessageError = (err) => {
    console.log(err); // To Do: add user alert
  }

  render() {
    const { classes } = this.props;
    return (

      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <p className={classes.message}>
              Have questions about our services, or simply want to bounce
              something off of us? Drop us a message so we can chat! We will never
              share your email address with anyone.
            </p>
          </Grid>

          <Grid item xs={12} sm={6}>
            <form noValidate autoComplete="off" onSubmit={this.sendMessage}>
              <InputBase
                placeholder="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
              />

              <InputBase
                placeholder="Email address"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange('email')}
              />

              <InputBase
                style={{ padding: 20 }}
                placeholder="Message"
                className={classes.textField}
                value={this.state.message}
                onChange={this.handleChange('message')}
                rows={10}
                rowsMax={10}
                multiline
              />

              <Button
                type="submit"
                className={classes.button}
                variant="contained"
              >
                Send message
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ContactForm.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(ContactForm);
