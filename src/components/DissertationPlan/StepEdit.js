import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  ListItem,
  TextField,
} from '@material-ui/core';

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
    textTransform: 'none',
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 25,
  },
});

/*
This is a child component of SectionStep
And a sibling component of StepText
*/
class StepEdit extends Component {
  state = {
    name: this.props.step.name, // displays the current value to be edited
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
  editStepSuccess = () => {
    this.props.getDissertationPlan(); // Reload the page with new step
    this.props.toggleIsEditing(); // Visually switch back to StepText
  }

  // On Error of editStep
  editStepError = (err) => {
    console.log('Error in editing step:', err); // TO DO: alert user
  }

  render() {
    const { classes } = this.props;

    return (
      // Renders a list item with a form and button inside
      <ListItem className={classes.nested}>
        <form onSubmit={this.editStep} className={classes.container}>
          <TextField
            fullWidth
            label="Edit Step"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            name="name" // needed for state change
            value={this.state.name} // needed for event.target.value
            onChange={this.onInputChange}
          />
          <Button
            size="small"
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
            value="Add New"
          >
            Submit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            className={classes.button}
            type="button"
            onClick={this.props.toggleIsEditing}
          >
            Cancel
          </Button>
        </form>

      </ListItem>
    );
  }
}
StepEdit.propTypes = {
  classes: PropTypes.shape().isRequired,
  step: PropTypes.shape().isRequired,
  toggleIsEditing: PropTypes.func.isRequired,
  getDissertationPlan: PropTypes.func.isRequired,
};

export default withStyles(styles)(StepEdit);
