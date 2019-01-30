import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

import {
  Button,
  TextField,
} from '@material-ui/core';

/* Material UI styling */
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
    maxWidth: 1000,

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
This is the child component of GoalType
And sibling component of TaskItem
*/
class NewTaskItem extends Component {
  state = {
    name: '', // name is for the item text content
  }

  // Handles storing the input text
  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // On click, handles sending new task
  addNewTask = (event) => {
    event.preventDefault();
    // this.props.typeId is being passed from the GoalType component
    axios.post('/api/goals/tasks/', { id: this.props.typeId, name: this.state.name })
      .then(this.addNewTaskSuccess)
      .catch(this.addNewTaskError);
  }

  // On Success of addNewTask
  addNewTaskSuccess = () => {
    this.props.getGoalList(); // Reload the page with new step
    this.props.onAddClick();
  }

  // On Error of addNewTask
  addNewTaskError = (err) => {
    console.log('Error in adding step:', err); // TO DO: alert the user
  }

  cancelAdding = () => {
    this.props.onAddClick(); // calls the function in parent (GoalType) that toggles views
  }

  render() {
    const { classes } = this.props;

    return (
      // Renders a list item with a form and button inside
      // <ListItem className={classes.nested}> // NOTE: removed because causing li in li console error
      <div>
        <form onSubmit={this.addNewTask} className={classes.container}>
          <TextField
            fullWidth
            label="New Task"
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
            color="primary"
            variant="contained"
            className={classes.button}
            type="submit"
            value="Add New"
          >
            Add
          </Button>

          <Button
            size="small"
            color="secondary"
            variant="contained"
            className={classes.button}
            type="button"
            value="Cancel"
            onClick={this.cancelAdding}
          >
            Cancel
          </Button>
        </form>
      </div>
      // </ListItem>
    );
  }
}

NewTaskItem.propTypes = {
  classes: PropTypes.shape().isRequired,
  typeId: PropTypes.number.isRequired,
  getGoalList: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(NewTaskItem);
