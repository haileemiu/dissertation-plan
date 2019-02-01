import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

/* Material UI styling */
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
    fontSize: '40px',
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
      <>
        <Fab
          size="small"
          color="primary"
          aria-label="Add"
          className={classes.margin}
          onClick={this.handleAddClick}
        >
          <AddIcon />
        </Fab>
      </>
    );
  }
}


AddNewTaskButton.propTypes = {
  classes: PropTypes.shape().isRequired,
  onAddClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddNewTaskButton);
