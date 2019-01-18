import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginLeft: 75,
  },

});

/*
This component holds the button for editing a type/section
Child component of GoalType
Sibling of TypeEdit
*/
class TypeEditButton extends Component {
  handleEditClick = () => {
    // this.props.toggleIsEditingType(); // May not need anymore WIP
    Swal({
      title: 'test',
      input: 'text',
      // inputs: [],
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationError('Shouldn\'t be empty');
        } else {
          // Request to update type/section
          axios.put(`/api/goals/types/${this.props.type.id}/edit`, { title: value })
            .then(this.editTypeSuccess)
            .catch(this.editTypeError);
        }
      },
    });
  }

  editTypeSuccess = () => {
    this.props.getGoalList();
    // this.props.toggleIsEditingType();
  }

  editTypeError = (err) => {
    console.log('Error in editing goal type:', err); // TO DO: alert user
  }


  render() {
    const { classes } = this.props;
    return (
      <Button
        size="small"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={this.handleEditClick}
        type="submit"
      >
        Edit section
      </Button>
    );
  }
}

TypeEditButton.propTypes = {
  classes: PropTypes.shape().isRequired,
  toggleIsEditingType: PropTypes.func.isRequired,
  type: PropTypes.shape().isRequired,
  getGoalList: PropTypes.func.isRequired,
};

export default withStyles(styles)(TypeEditButton);
