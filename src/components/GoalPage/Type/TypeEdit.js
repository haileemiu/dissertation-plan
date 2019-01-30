import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditOutlined from '@material-ui/icons/EditOutlined';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginLeft: 75,
  },
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

/*
This component holds the button and dialog box for editing a type/section
Child component of GoalType
*/
class TypeEditButton extends Component {

  state = {
    open: false,
    section: '',
  };

  // Handles storing the input text
  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  editGoalType = (type) => {
    this.setState({ open: true, section: type.title });
  }

  cancelEditAction = () => {
    this.setState({ open: false });
  }

  submitEdit = () => {
    this.setState({ open: false });
    axios.put(`/api/goals/types/${this.props.type.id}/edit`, { title: this.state.section })
      .then(this.editTypeSuccess)
      .catch(this.editTypeError);
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
      <>
        <EditOutlined
          size="small"
          variant="contained"
          // color="primary"
          className={classes.button}
          onClick={() => this.editGoalType(type)}
          type="submit"
        />

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"

        >
          <div className={classes.dialogBox}>
            <DialogTitle id="form-dialog-title" style={{ color: '#333333' }}>Rename</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="section"
                label="Section Heading"
                fullWidth
                value={this.state.section}
                onChange={this.onInputChange}
              />
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center' }}>
              <Button onClick={this.cancelEditAction} className={classes.cancelButton}>
                Cancel
              </Button>
              <Button onClick={() => this.submitEdit(type.id)} autoFocus className={classes.deleteButton}>
                Submit
              </Button>
            </DialogActions>
          </div>
        </Dialog>

      </>
    );
  }
}

TypeEditButton.propTypes = {
  classes: PropTypes.shape().isRequired,
  type: PropTypes.shape().isRequired,
  getGoalList: PropTypes.func.isRequired,
};

export default withStyles(styles)(TypeEditButton);
