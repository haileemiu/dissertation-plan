import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import { Button } from '@material-ui/core';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginLeft: 75,
  },
});

/*
This component holds the button and dialog box for editing a type/section
Child component of GoalType
*/
class TypeEditButton extends Component {
  handleEditClick = (type) => {
    Swal({
      title: 'Edit section title',
      input: 'text',
      inputValue: String(type.title),
      showCancelButton: true,
      preConfirm: (inputValue) => {
        if (!inputValue) {
          Swal.showValidationMessage('Shouldn\'t be empty');
        } else {
          // Request to update type/section
          axios.put(`/api/goals/types/${this.props.type.id}/edit`, { title: inputValue })
            .then(this.editTypeSuccess)
            .catch(this.editTypeError);
        }
      },
    });
  }

  editTypeSuccess = () => {
    this.props.getGoalList();
  }

  editTypeError = (err) => {
    console.log('Error in editing goal type:', err); // TO DO: alert user
  }


  render() {
    const { classes, type } = this.props;
    return (
      <Button
        size="small"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => this.handleEditClick(type)}
        type="submit"
      >
        Edit section
      </Button>
    );
  }
}

TypeEditButton.propTypes = {
  classes: PropTypes.shape().isRequired,
  type: PropTypes.shape().isRequired,
  getGoalList: PropTypes.func.isRequired,
};

export default withStyles(styles)(TypeEditButton);
