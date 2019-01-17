import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ListItem, TextField, Button } from '@material-ui/core';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 25,
  },
});

/*
Child component of GoalType
Sibling component of TypeEditButton
*/
class TypeEdit extends Component {
  state = {
    goalType: this.props.type.title,
  }

  // Handles storing the input text
  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // On click, handles editing goal type
  editType = (event) => {
    event.preventDefault();

    axios.put(`/api/goals/types/${this.props.type.id}/edit`, { title: this.state.goalType })
      .then(this.editTypeSuccess)
      .catch(this.editTypeError);
  }

  editTypeSuccess = () => {
    this.props.getGoalList();
    this.props.toggleIsEditingType();
  }

  editTypeError = (err) => {
    console.log('Error in editing goal type:', err); // TO DO: alert user
  }

  render() {
    const { classes } = this.props;

    return (
      // <ListItem className={classes.nested}> NOTE: removed because causing li in li console error
      <>
        <form onSubmit={this.editType} className={classes.container}>
          <TextField
            fullWidth
            className={classes.textField}
            margin="normal"
            // variant="outlined"
            name="goalType" // needed for state change
            value={this.state.goalType} // needed for event.target.value
            onChange={this.onInputChange}
          />
          <Button
            size="small"
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          // value="goalType"
          >
            Submit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            className={classes.button}
            type="button"
            onClick={this.props.toggleIsEditingType}
          >
            Cancel
          </Button>
        </form>
      </>
      // </ListItem>
    );
  }
}

TypeEdit.propTypes = {
  classes: PropTypes.shape().isRequired,
  type: PropTypes.shape().isRequired,
  toggleIsEditingType: PropTypes.func.isRequired,
  getGoalList: PropTypes.func.isRequired,
};

export default withStyles(styles)(TypeEdit);
