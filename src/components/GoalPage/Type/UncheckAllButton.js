import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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

  uncheckAllTasksInType = () => {
    // Axios to set all task with type id to false
    axios.put(`/api/goals/types/${this.props.type.id}/uncheck`)
      .then(this.uncheckAllTasksInTypeSuccess)
      .catch(this.uncheckAllTasksInTypeError);
  }

  // WIP
  uncheckAllTasksInTypeSuccess = () => {
    this.props.getGoalList();
    // this.props.uncheckAllStateChange();
  }

  uncheckAllTasksInTypeError = (err) => {
    console.log('Error in unchecking all tasks of this type:', err); // TO DO: alert the user
  }


  render() {
    const { classes } = this.props;

    return (
      <Button
        size="small"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={this.uncheckAllTasksInType}
        type="button"
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
  uncheckAllStateChange: PropTypes.isRequired,
};

export default withStyles(styles)(UncheckAllButton);
