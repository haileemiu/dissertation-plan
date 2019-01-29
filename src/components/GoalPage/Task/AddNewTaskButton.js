import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal';

/* Material UI styling */
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    textTransform: 'none',
    backgroundColor: teal['300'],
    borderRadius: '100px',
    paddingLeft: '15px',
    paddingRight: '15px',
  },

});

/*
Child component of GoalType
Sibling component of NewTaskItem
*/
class AddNewTaskButton extends Component {
  handleAddClick = () => {
    this.props.onAddClick();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          size="small"
          color="primary"
          variant="contained"
          type="submit"
          onClick={this.handleAddClick}
          className={classes.button}
        >
          + Add an item
        </Button>
      </div>
    );
  }
}


AddNewTaskButton.propTypes = {
  classes: PropTypes.shape().isRequired,
  onAddClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddNewTaskButton);
