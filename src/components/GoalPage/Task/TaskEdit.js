import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

/*
This is a child component of TaskItem
And a sibling component of TaskText
*/
class TaskEdit extends Component {
  state = {
    name: this.props.task.title, // displays the current value to be edited
  }

  // Handles storing the input text
  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // On click, handles editing task
  editTask = (event) => {
    event.preventDefault();

    axios.put(`/api/goals/tasks/${this.props.task.id}/edit`, { name: this.state.name })
      .then(this.editTaskSuccess)
      .catch(this.editTaskError);
  }

  // On Success of editTask
  editTaskSuccess = () => {
    this.props.getGoalList(); // Reload the page with new step
    this.props.toggleIsEditing(); // Visually switch back to StepText
  }

  // On Error of editTask
  editTaskError = (err) => {
    console.log('Error in editing task:', err); // TO DO: alert user
  }

  render() {
    const { classes } = this.props;

    return (
      // Renders a list item with a form and button inside
      <ListItem className={classes.nested}>
        <form onSubmit={this.editTask} className={classes.container}>
          <TextField
            fullWidth
            className={classes.textField}
            margin="normal"
            // variant="outlined"
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
TaskEdit.propTypes = {
  classes: PropTypes.shape().isRequired,
  task: PropTypes.shape().isRequired,
  toggleIsEditing: PropTypes.func.isRequired,
  getGoalList: PropTypes.func.isRequired,
};

export default withStyles(styles)(TaskEdit);
