import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
  Button,
  ListItem,
  TextField,
} from '@material-ui/core';


/* Material UI styling */
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
    maxWidth: 1000,
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
This is the child component of Section
And sibling component of SectionStep
*/
class NewSectionStep extends Component {
  state = {
    name: '', // name is for the step text content
  }

  // Handles storing the input text
  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // On click, handles sending new step
  addNewStep = (event) => {
    event.preventDefault();
    // this.setState({ isAdding: true });
    // this.props.sectionId is being passed from the Section component
    axios.post('/api/dissertation/', { id: this.props.sectionId, name: this.state.name })
      .then(this.addNewStepSuccess)
      .catch(this.addNewStepError);
  }

  // On Success of addNewStep
  addNewStepSuccess = () => {
    this.props.getDissertationPlan(); // Reload the page with new step
    this.props.onAddClick();
  }

  // On Error of addNewStep
  addNewStepError = (err) => {
    console.log('Error in adding step:', err); // TO DO: alert the user
  }

  cancelAdding = () => {
    this.props.onAddClick(); // calls the function in parent (Section) that toggles views
  }

  render() {
    const { classes } = this.props;

    return (
      // Renders a list item with a form and button inside
      <ListItem className={classes.nested}>
        <form onSubmit={this.addNewStep} className={classes.container}>
          <TextField
            fullWidth
            label="New Step"
            className={classes.textField}
            margin="normal"
            // variant="outlined"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onInputChange}
          />
          <Button
            size="small"
            variant="contained"
            className={classes.button}
            type="submit"
            value="Add New"
          >
            Add
          </Button>

          <Button
            size="small"
            variant="contained"
            className={classes.button}
            type="button"
            value="Cancel"
            onClick={this.cancelAdding}
          >
            Cancel
          </Button>
        </form>
      </ListItem>
    );
  }
}

NewSectionStep.propTypes = {
  classes: PropTypes.shape().isRequired,
  sectionId: PropTypes.number.isRequired,
  getDissertationPlan: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(NewSectionStep);
