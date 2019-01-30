import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddCircle from '@material-ui/icons/AddCircle';
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
  addButton: {
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
      <div>
        <AddCircle
          color="primary"
          variant="contained"
          onClick={this.handleAddClick}
          className={classes.addButton}
        />
      </div>
    );
  }
}


AddNewTaskButton.propTypes = {
  classes: PropTypes.shape().isRequired,
  onAddClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddNewTaskButton);
