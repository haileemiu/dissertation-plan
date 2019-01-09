import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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

class NewSectionStep extends Component {
  state = {
    name: '',
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleAddNewStep = (event) => {
    event.preventDefault();
    axios.post('/api/dissertation', { id: this.props.sectionId, name: this.state.name })
      .then(this.handleAddNewStepSuccess)
      .catch(this.handleAddNewStepError);
  }

  // On Success of handleAddNewStep
  handleAddNewStepSuccess = (response) => {
    console.log('Success step added:', response);
    this.props.getDissertationPlan();
    this.setState({ name: '' });
  }

  // On Error of handleAddNewStep
  handleAddNewStepError = (err) => {
    console.log('Error in adding step:', err);
  }

  render() {
    const { classes } = this.props;

    return (
      <ListItem className={classes.nested}>
        <form onSubmit={this.handleAddNewStep} className={classes.container}>
          <TextField
            label="New Step"
            className={classes.textField}
            margin="normal"
            variant="outlined"
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
        </form>
        <AddCircleIcon className={classes.icon} />
      </ListItem>
    );
  }
}

NewSectionStep.propTypes = {
  classes: PropTypes.shape().isRequired,
  sectionId: PropTypes.number.isRequired,
  getDissertationPlan: PropTypes.func.isRequired,
};

export default withStyles(styles)(NewSectionStep);
