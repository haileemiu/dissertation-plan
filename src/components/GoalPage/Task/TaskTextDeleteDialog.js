import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {
  Clear,
} from '@material-ui/icons';

/* Material UI styling */
const styles = theme => ({
  deleteButton: {
    backgroundColor: '#4DB6AC',
    color: 'white',
    textTransform: 'none',
    borderRadius: '50px',
    width: '100px',
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
class AlertDialog extends React.Component {
  state = {
    open: false,
  };

  deleteGoalTask = (taskId) => {
    this.setState({ open: true });
    console.log('clicked delete', taskId);
  }

  cancelDeleteAction = () => {
    this.setState({ open: false });
    console.log('cancled');
  }

  confirmDeleteAction = () => {
    console.log('confirmed');
    axios.delete(`/api/goals/tasks/${this.props.task.id}`)
      .then(this.deleteGoalTaskSuccess)
      .catch(this.deleteGoalTaskError);

    this.setState({ open: false }); // May need to move based on how handle if error in deleting
  }

  deleteGoalTaskSuccess = () => {
    this.props.getGoalList();
  }

  deleteGoalTaskError = (err) => {
    console.log('Error in deleting:', err); // TO DO: alert user
  }

  render() {
    const { classes, task } = this.props;
    return (
      <div>
        <Clear variant="outlined" onClick={() => this.deleteGoalTask(task.id)} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"

        >
          <div className={classes.dialogBox}>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" style={{ color: '#333333' }}>
                Are you sure you want to delete this item?
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center' }}>
              <Button onClick={this.cancelDeleteAction} className={classes.cancelButton}>
                Cancel
              </Button>
              <Button onClick={this.confirmDeleteAction} autoFocus className={classes.deleteButton}>
                Delete
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}

AlertDialog.propTypes = {
  task: PropTypes.shape().isRequired,
  getGoalList: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(AlertDialog);
