import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import { Button } from '@material-ui/core';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginLeft: 75,
  },
});

/*
Child component of GoalType
*/
class UncheckAllButton extends Component {
  state = {
  }

  // WIP
  uncheckAllTasksInType = () => {
    // Set all tasks with that type/section id to false
    axios.put(`/api/goals/types/${this.props.type.id}/uncheck`)
      .then(this.uncheckAllTasksInTypeSuccess)
      .catch(this.uncheckAllTasksInTypeError);
  }
    // // TEST
    // console.log('this.props.type:', this.props.type);
    // // Warning alert before uncheck all of that type/section
    // Swal({
    //   title: 'Are you sure you want to uncheck all in this section?',
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#d33',
    //   cancelButtonColor: '#3085d6',
    //   confirmButtonText: 'Yes, clear checks',
    // }).then((result) => {
    //   if (result.value) {

  //     }
  //   });
  // };

  // WIP
  uncheckAllTasksInTypeSuccess = () => {
    console.log('click uncheck success')
    // need to change the .checked state accordingly
    // call a function that changes the state
    this.props.getGoalList();
  }

  uncheckAllTasksInTypeError = (err) => {
    console.log('Error in unchecking all tasks of this type:', err); // TO DO: alert the user
  }


  render() {
    const { classes, type } = this.props;
    
    return (
      <Button
        size="small"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={this.uncheckAllTasksInType}
        type="button"
        value={type}
      >
        Uncheck All
      </Button>
    );
  }
}

UncheckAllButton.propTypes = {
  classes: PropTypes.shape().isRequired,
  type: PropTypes.shape().isRequired,
  getGoalList: PropTypes.func.isRequired,
};

export default withStyles(styles)(UncheckAllButton);
