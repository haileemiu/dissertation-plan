import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { Button } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    // marginLeft: 75,
    textTransform: 'none',
    backgroundColor: teal['300'],
    borderRadius: '100px',
    paddingLeft: '15px',
    paddingRight: '15px',
  },
});

/*
Child component of GoalType
*/
class UncheckAllButton extends Component {
  state = {
    tasksInList: false,
  }

  componentDidMount() {
    console.log('this.props.type.task:', this.props.type.task);
    if (this.props.type.task.length !== 0) {
      this.setState({ tasksInList: true });
    } else {
      this.setState({ tasksInList: false });
    }
  }

  uncheckAllTasksInType = () => {
    // Warning alert before uncheck all of that type/section
    Swal({
      title: 'Are you sure you want to uncheck all in this section?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, clear checks',
    }).then((result) => {
      if (result.value) {
        // Set all tasks with that type/section id to false
        axios.put(`/api/goals/types/${this.props.type.id}/uncheck`)
          .then(this.uncheckAllTasksInTypeSuccess)
          .catch(this.uncheckAllTasksInTypeError);
      }
    });
  };

  uncheckAllTasksInTypeSuccess = () => {
    this.props.getGoalList();
  }

  uncheckAllTasksInTypeError = (err) => {
    console.log('Error in unchecking all tasks of this type:', err); // TO DO: alert the user
  }


  render() {
    const { classes, type } = this.props;

    return (
      <>
        {this.state.tasksInList
          ? (
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
          ) : null
      }

      </>
    );
  }
}

UncheckAllButton.propTypes = {
  classes: PropTypes.shape().isRequired,
  type: PropTypes.shape().isRequired,
  getGoalList: PropTypes.func.isRequired,
};

export default withStyles(styles)(UncheckAllButton);
