import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
// import Swal from 'sweetalert2/dist/sweetalert2';
import axios from 'axios';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    // flexDirection: 'column',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '400px',
  },
  messageRight: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '400px',
  },
  buttonRight: {
    // display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    paddingRight: '100px',
    textAlign: 'right',
  },
  button: {
    textTransform: 'none',
    backgroundColor: '#58BCD2',
    color: 'white',
    borderRadius: '50px',

  },
});

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
          <form className={classes.container} noValidate autoComplete="off" onSubmit={this.sendMessage}>
            <Grid item xs={6}>
              <TextField
                label="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
              />

              <TextField
                label="Email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
                variant="outlined"
              />

              <TextField
                label="Area of Study"
                className={classes.textField}
                value={this.state.study}
                onChange={this.handleChange('study')}
                margin="normal"
                variant="outlined"
              />

              <TextField
                label="Stage of PhD"
                className={classes.textField}
                value={this.state.stage}
                onChange={this.handleChange('stage')}
                margin="normal"
                variant="outlined"
              />

              <TextField
                label="How long have you been working?"
                className={classes.textField}
                value={this.state.length}
                onChange={this.handleChange('length')}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Message"
                className={classes.messageRight}
                // className={classes.textField}
                value={this.state.message}
                onChange={this.handleChange('message')}
                margin="normal"
                variant="outlined"
                multiline={true}
                rows={18}
                rowsMax={18}
              />
            </Grid>
            {/* <Grid item={12} className={classes.noteLeft}>
              <div></div>
            </Grid> */}
            <Grid item xs={12} className={classes.buttonRight}>
              We will <strong>never</strong> share your email address with anyone or send you spam.&nbsp;&nbsp;
              <Button
                type="submit"
                className={classes.button}
                variant="contained"
              >
                Send message
              </Button>

            </Grid>

          </form>
        </Grid>
      </div>
    );
  }
}

ContactForm.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(ContactForm);
