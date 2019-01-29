import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ListItem } from '@material-ui/core';

import TaskText from './TaskText';
import TaskEdit from './TaskEdit';


/* Material UI styling */
const styles = theme => ({
  nested: {
    padding: theme.spacing.unit,
    border: '1px solid #E3E3E3',
    borderRadius: '25px',
    backgroundColor: '#F2F2F2',
    marginLeft: '15px',
    marginBottom: '5px',
  },
});

/*
This is the child component of GoalType
And a parent component of TaskText and TaskEdit
*/
class TaskItem extends Component {
  state = {
    isEditing: false,
  }

  toggleIsEditing = () => {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }));
  }

  render() {
    const { classes, task } = this.props;

    return (
      // Holds the individual step
      <ListItem button className={classes.nested} disableTouchRipple>
        {/* If isEditing is false, render StepText */}
        {/* If isEditing is true, render EditStep */}
        {this.state.isEditing
          ? <TaskEdit task={task} toggleIsEditing={this.toggleIsEditing} getGoalList={this.props.getGoalList} />
          : <TaskText task={task} toggleIsEditing={this.toggleIsEditing} getGoalList={this.props.getGoalList} />}
      </ListItem>
    );
  }
}

TaskItem.propTypes = {
  task: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
  getGoalList: PropTypes.func.isRequired,
};

export default withStyles(styles)(TaskItem);
