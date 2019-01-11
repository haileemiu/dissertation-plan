import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';

import TaskText from './TaskText';
import TaskEdit from './TaskEdit';


/* Material UI styling */
const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
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
      <ListItem button className={classes.nested}>
        {/* If isEditing is false, render StepText */}
        {/* If isEditing is true, render EditStep */}
        {this.state.isEditing ? <TaskEdit task={task} toggleIsEditing={this.toggleIsEditing} getGoalList={this.props.getGoalList} /> : <TaskText task={task} toggleIsEditing={this.toggleIsEditing} getDissertationPlan={this.props.getGoalList} />}
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
