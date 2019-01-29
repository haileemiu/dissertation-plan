import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import teal from '@material-ui/core/colors/teal';
import {
  Checkbox,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {
  Clear,
} from '@material-ui/icons';
// CircleCheckedFilled & CircleUnchecked are from specific icon folders
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import EditOutlined from '@material-ui/icons/EditOutlined';

/* Material UI styling */
const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 25,
  },
  root: {
    color: teal['A400'],
    '&$checked': {
      color: teal['A400'],
    },
  },
  checked: {},
});

/*
This is the child component of TaskItem
And sibling component of TaskEdit
*/
class TaskText extends Component {
  // Handles checkbox sending to the api
  onChange = (event) => {
    // Note: checked is an html attribute on inputs
    axios.put(`/api/goals/tasks/${this.props.task.id}/completed`, { completed: event.target.checked })
      .then(this.handleChangeSuccess)
      .catch(this.handleChangeError);
  }

  handleChangeSuccess = () => {
    this.props.getGoalList();
  }

  handleChangeError = (err) => {
    console.log('Error in marking complete:', err); // TODO: alert user
  }

  // Edit click
  handleEditClick = () => {
    // State handled in TaskItem
    this.props.toggleIsEditing();
  }

  // Delete click
  handleDeleteClick = () => {
    // Warning alert before delete
    Swal({
      title: 'Are you sure you want to delete this item?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.value) {
        // Delete task
        axios.delete(`/api/goals/tasks/${this.props.task.id}`)
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
            onChange={this.onChange}
            checked={task.completed}
            classes={{
              root: classes.root,
              checked: classes.checked,
            }}
            icon={<CircleUnchecked />}
            checkedIcon={<CircleCheckedFilled />}
          />
        </ListItemIcon>

        {/* Text of task in a Material UI component (ListItemText) */}
        <ListItemText
          inset
          disableTypography
          primary={<Typography style={{ fontFamily: 'Avenir', fontSize: '18px' }}>{task.title}</Typography>}
        />

        <EditOutlined
          className={classes.icon}
          onClick={this.handleEditClick}
        />

        <Clear
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
