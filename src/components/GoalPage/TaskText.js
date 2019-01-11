import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';


/* Material UI styling */
const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 25,
  },
});

/*
This is the child component of TaskItem
And sibling component of TaskEdit
*/
class TaskText extends Component {
  // Handles checkbox sending to the api
  onChange = (event) => {
    // Note: checked is an html attribute on inputs
    axios.put(`/api/goals/${this.props.task.id}/completed`, { completed: event.target.checked })
      .then(this.handleChangeSuccess)
      .catch(this.handleChangeError);
  }

  onChangeSuccess = () => {
    this.props.getGoalList();
  }

  onChangeError = (err) => {
    console.log('Error in marking complete:', err); // TODO: alert user
  }

  // Edit click
  handleEditClick = () => {
    // State handled in TaskItem
    this.props.toggleIsEditing();
  }

  // Delete click
  handleDeleteClick = () => {
    Swal({
      title: 'Are you sure you want to delete this?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.value) {
        axios.delete(`/api/goals/${this.props.task.id}`)
          .then(this.handleDeleteClickSuccess)
          .catch(this.handleDeleteClickError);
      }
    });
  }

  handleDeleteClickSuccess = () => {
    this.props.getGoalList();
  }

  handleDeleteClickError = (err) => {
    console.log('Error in deleting:', err); // TO DO: alert user
  }


  render() {
    const { classes, task } = this.props;

    return (
      // Holds the individual task with edit icon and delete icon
      <>
        <ListItemIcon>

          {/* Checkbox */}
          <Checkbox
            type="checkbox"
            defaultChecked={task.completed} // defaultChecked is necessary
            onChange={this.onChange}
            value="true"
          />
        </ListItemIcon>

        {/* Text of task */}
        <ListItemText inset primary={task.name} />
        <EditIcon
          className={classes.icon}
          onClick={this.handleEditClick}
        />
        <DeleteIcon
          className={classes.icon}
          onClick={this.handleDeleteClick}
        />
    </>
    );
  }
}

TaskText.propTypes = {
  task: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
  toggleIsEditing: PropTypes.func.isRequired,
  getGoalList: PropTypes.func.isRequired,
};

export default withStyles(styles)(TaskText);
