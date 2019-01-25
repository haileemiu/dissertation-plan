import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

/* Material UI styling */
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginLeft: 75,
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
