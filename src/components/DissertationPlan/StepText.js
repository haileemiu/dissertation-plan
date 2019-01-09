import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
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
This is the child component of Section
And sibling component of NewSectionStep
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
    console.log('Success marked completed:', response);
  }

  onChangeError = (err) => {
    console.log('Error in marking complete:', err);
  }

  // Edit click
  handleEditClick = () => {
    this.props.toggleIsEditing();
  }

  // Delete click
  handleDeleteClick = () => {
    console.log(this.props.step.id);
    axios.delete(`/api/dissertation/${this.props.step.id}`)
      .then(this.handleDeleteClickSuccess)
      .catch(this.handleDeleteClickError);
  }

  handleDeleteClickSuccess = (response) => {
    console.log('Success deleting step:', response);
  }
  
  handleDeleteClickError = (err) => {
    console.log('Error in deleting:', err);
  }


  render() {
    const { classes, step } = this.props;

    return (
      // Holds the individual step
      <>
        <ListItemIcon>

          {/* Checkbox */}
          <Checkbox
            type="checkbox"
            defaultChecked={step.completed} // defaultChecked is necessary
            onChange={this.onChange}
            value={step.completed}
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
  toggleIsEditing: PropTypes.shape().isRequired,
};

export default withStyles(styles)(StepText);
