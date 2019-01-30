import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { Button } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContent';

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
  confirmButton: {
    backgroundColor: '#4DB6AC',
    color: 'white',
    textTransform: 'none',
    borderRadius: '50px',
    width: '150px',
    '&:hover': {
      backgroundColor: '#009688',
    },
  },
  cancelButton: {
    backgroundColor: 'white',
    color: '#4DB6AC',
    textTransform: 'none',
    border: '1px solid #4DB6AC',
    borderRadius: '50px',
    width: '100px',
    '&:hover': {
      backgroundColor: '#4DB6AC',
      color: 'white',
    },
  },
  dialogBox: {
    border: '1px solid black',
  },
});

/*
Child component of GoalType
*/
class UncheckAllButton extends Component {
  state = {
    tasksInList: false,
    open: false,
  }

  // Only show uncheck all button if there are tasks in the list
  componentDidMount() {
    console.log('this.props.type.task:', this.props.type.task);
    if (this.props.type.task.length !== 0) {
      this.setState({ tasksInList: true });
    } else {
      this.setState({ tasksInList: false });
    }
  }

  uncheckAllTasksInType = () => {
    this.setState({ open: true });
  }

  cancelAction = () => {
    this.setState({ open: false });
  }

  confirmUncheckAll = () => {
    this.setState({ open: false });

    axios.put(`/api/goals/types/${this.props.type.id}/uncheck`)
      .then(this.uncheckAllTasksInTypeSuccess)
      .catch(this.uncheckAllTasksInTypeError);
  }

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
              onClick={() => this.uncheckAllTasksInType(type)}
              type="button"
              value={type}
            >
              Uncheck All
            </Button>
          ) : null
        }

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"

        >
          <div className={classes.dialogBox}>

            <DialogContentText id="alert-dialog-description" style={{ color: '#333333' }}>

              Are you sure you want to uncheck all in this section?
            </DialogContentText>
            <DialogActions style={{ justifyContent: 'center' }}>
              <Button onClick={this.cancelAction} className={classes.cancelButton}>
                Cancel
              </Button>
              <Button onClick={() => this.confirmUncheckAll(type.id)} autoFocus className={classes.confirmButton}>
                Yes, clear checks
              </Button>
            </DialogActions>
          </div>
        </Dialog>
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
