import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import Divider from '@material-ui/core/Divider';
import TaskItem from '../Task/TaskItem';
import NewTaskItem from '../Task/NewTaskItem';
import AddNewTaskButton from '../Task/AddNewTaskButton';
import TypeEdit from './TypeEdit';
import UncheckAllButton from './UncheckAllButton';

/*
Child component of GoalList
Parent component of TaskItem and NewTaskItem
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
          {this.state.isOpen ? <Remove /> : <Add />}

          {/* Section Name Text */}
          <ListItemText inset primary={type.title} />
        </ListItem>

        {/* Area inside the nested list where steps will be listed out */}
        <Collapse in={this.state.isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding style={{ backgroundColor: 'rgba(249, 249, 249, 1)' }}>

            {/* List each task */}
            {type.task.map(task => <TaskItem task={task} key={task.id} getGoalList={this.props.getGoalList} />)}

            <ListItem>
              {/* Uncheck all button */}
              <UncheckAllButton
                type={type}
                getGoalList={this.props.getGoalList}
              />

              {/* Edit section/type button and input */}
              <TypeEdit type={type} toggleIsEditingType={this.toggleIsEditingType} getGoalList={this.props.getGoalList} />

              {/* Toggle between Add a new task */}
              {this.state.isAdding
                ? <NewTaskItem onAddClick={this.onAddClick} typeId={type.id} getGoalList={this.props.getGoalList} />
                : <AddNewTaskButton onAddClick={this.onAddClick} />}
            </ListItem>
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
