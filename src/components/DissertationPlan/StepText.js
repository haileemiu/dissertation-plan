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
This is the child component of SectionStep
And sibling component of StepEdit
*/
class StepText extends Component {
  // Handles checkbox sending to the api
  onChange = (event) => {
    // Note: checked is an html attribute on inputs
    axios.put(`/api/dissertation/${this.props.step.id}/completed`, { completed: event.target.checked }) 
      .then(this.handleChangeSuccess)
      .catch(this.handleChangeError);
  }

  onChangeSuccess = (response) => {
    this.props.getDissertationPlan();
    console.log('Success marked completed:', response);
  }

  onChangeError = (err) => {
    console.log('Error in marking complete:', err);
  }

  // Edit click
  handleEditClick = () => {
    // State handled in SectionStep
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
        axios.delete(`/api/dissertation/${this.props.step.id}`)
          .then(this.handleDeleteClickSuccess)
          .catch(this.handleDeleteClickError);
      }
    });
  }

  handleDeleteClickSuccess = (response) => {
    console.log('Success deleting step:', response);
    this.props.getDissertationPlan();
  }

  handleDeleteClickError = (err) => {
    console.log('Error in deleting:', err);
  }


  render() {
    const { classes, step } = this.props;

    return (
      // Holds the individual step with edit icon and delete icon
      <>
        <ListItemIcon>

          {/* Checkbox */}
          <Checkbox
            type="checkbox"
            defaultChecked={step.completed} // defaultChecked is necessary
            onChange={this.onChange}
            value="true"
          />
        </ListItemIcon>

        {/* Text of step */}
        <ListItemText inset primary={step.name} />
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

StepText.propTypes = {
  step: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
  toggleIsEditing: PropTypes.func.isRequired,
  getDissertationPlan: PropTypes.func.isRequired,
};

export default withStyles(styles)(StepText);
