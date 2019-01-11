import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider';

import TaskItem from './TaskItem';
import NewTaskItem from './NewTaskItem';
import AddNewTaskButton from './AddNewTaskButton';

/*
This is the child component of GoalList
And the parent component of TaskItem and NewTaskItem
*/
class GoalType extends Component {
  state = {
    isOpen: false, // Variable for collapsing all sections nested list
    isAdding: false, // Variable for toggling add new step
  };

  // Handles collapse on click of any where in the heading
  onHeadingClick = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  // Toggle isAdding
  onAddClick = () => {
    this.setState(prevState => ({ isAdding: !prevState.isAdding }));
  }

  render() {
    const { type } = this.props;

    return (
      <>
        {/* Goal Types */}
        <Divider />
        <ListItem button onClick={this.onHeadingClick}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>

          {/* Section Name Text */}
          <ListItemText inset primary={type.title} />
          {type.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        {/* Area inside the nested list where steps will be listed out */}
        <Collapse in={this.state.isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

            {/* List each task */}
            {type.task.map(task => <TaskItem task={task} key={task.id} getGoalList={this.props.getGoalList} />)}

            {/* Add a new task */}
            {this.state.isAdding ? <NewTaskItem onAddClick={this.onAddClick} typeId={type.id} getGoalList={this.props.getGoalList} /> : <AddNewTaskButton onAddClick={this.onAddClick} />}
      
          </List>
        </Collapse>

      </>
    );
  }
}

GoalType.propTypes = {
  type: PropTypes.shape().isRequired,
  getGoalList: PropTypes.func.isRequired,
};

export default GoalType;
