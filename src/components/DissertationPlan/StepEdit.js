import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 25,
  },
});

class StepEdit extends Component {
  state = {
    name: '', // name is for the step text content
  }

  // Handles storing the input text
  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // On click, handles editing step
  editStep = (event) => {
    event.preventDefault();

    axios.put(`/api/dissertation/${this.props.step.id}/edit`, { name: this.state.name })
      .then(this.editStepSuccess)
      .catch(this.editStepError);
  }

  // On Success of editStep
  editStepSuccess = (response) => {
    console.log('Success step added:', response);
    this.props.toggleIsEditing();
    // this.props.getDissertationPlan(); // Reload the page with new step
    this.setState({ name: '' }); // Empty the input box
  }

  // On Error of editStep
  editStepError = (err) => {
    console.log('Error in editing step:', err);
  }


  render() {
    const { classes, step } = this.props;

    return (
      // Renders a list item with a form and button inside
      <ListItem className={classes.nested}>
        <form onSubmit={this.editStep} className={classes.container}>
          <TextField
            // label="Edit"
            placeholder={step.name}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onInputChange}
          />
          <Button
            size="small"
            // variant="contained"
            className={classes.button}
            type="submit"
            value="Add New"
          >
            Submit
          </Button>
        </form>
        
      </ListItem>
    );
  }
}
StepEdit.propTypes = {
  classes: PropTypes.shape().isRequired,
  step: PropTypes.shape().isRequired,
  toggleIsEditing: PropTypes.shape().isRequired,
  // getDissertationPlan: PropTypes.shape().isRequired,
};

export default withStyles(styles)(StepEdit);
