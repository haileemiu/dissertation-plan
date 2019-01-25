import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  ListItem,
  TextField,
} from '@material-ui/core';

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
});

/*
Child component of GoalList
Sibling component of AddNewSectionButton
*/
class AddNewSectionInput extends Component {
  state = {
    newSection: '',
  }

  // Handles storing the input text
  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // Sends new section to database
  addNewSection = (event) => {
    event.preventDefault();

    console.log(this.state.newSection);
    axios.post('/api/goals/types', { title: this.state.newSection })
      .then(this.addNewSectionSuccess)
      .catch(this.addNewSectionError);
  }

  // On Success of addNewSection
  addNewSectionSuccess = () => {
    this.props.getGoalList(); // Reload the page with new step
    this.props.toggleAddSection(); // Visually switch back to StepText
  }

  // On Error of addNewSection
  addNewSectionError = (err) => {
    console.log('Error in adding section:', err); // TO DO: alert user
  }

  render() {
    const { classes } = this.props;
    return (
      <ListItem>
        <form onSubmit={this.addNewSection} className={classes.container}>
          <TextField
            fullWidth
            className={classes.textField}
            margin="normal"
            name="newSection" // needed for state change
            value={this.state.newSection} // needed for event.target.value
            onChange={this.onInputChange}
          />
          <Button
            size="small"
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
            value="addNewSection"
          >
            Add Section
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            className={classes.button}
            type="button"
            onClick={this.props.toggleAddSection}
          >
            Cancel
          </Button>
        </form>
      </ListItem>

    );
  }
}

AddNewSectionInput.propTypes = {
  classes: PropTypes.shape().isRequired,
  toggleAddSection: PropTypes.func.isRequired,
  getGoalList: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddNewSectionInput);
