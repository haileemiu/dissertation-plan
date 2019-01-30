import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Clear,
} from '@material-ui/icons';

class AlertDialog extends React.Component {
  state = {
    open: false,
  };

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  deleteGoalType = (typeId) => {
    this.setState({ open: true });
    console.log('clicked delete', typeId);
  }

  cancelDeleteAction = () => {
    this.setState({ open: false });
    console.log('cancled');
  }

  confirmDeleteAction = (typeId) => {
    console.log('confirmed');
    axios.delete(`/api/goals/types/${typeId}`)
      .then(this.deleteGoalTypeSuccess)
      .catch(this.deleteGoalTypeError);

    this.setState({ open: false }); // May need to move based on how handle if error in deleting
  }

  deleteGoalTypeSuccess = () => {
    this.props.getGoalList();
  }

  deleteGoalTypeError = (err) => {
    console.log('Error in deleting:', err); // TO DO: alert user
  }

  render() {
    const { type } = this.props;
    return (
      <div>
        <Clear variant="outlined" color="primary" onClick={() => this.deleteGoalType(type.id)} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this entire section and all tasks it contains?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelDeleteAction} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.confirmDeleteAction(type.id)} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AlertDialog.propTypes = {
  type: PropTypes.shape().isRequired,
  getGoalList: PropTypes.func.isRequired,
};

export default AlertDialog;
