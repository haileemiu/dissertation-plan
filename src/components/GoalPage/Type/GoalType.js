import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons';

import TaskItem from '../Task/TaskItem';
import NewTaskItem from '../Task/NewTaskItem';
import AddNewTaskButton from '../Task/AddNewTaskButton';
import TypeEdit from './TypeEdit';
import UncheckAllButton from './UncheckAllButton';
import GoalTypeDeleteDialog from './GoalTypeDeleteDialog';

/* Material UI styling */
const styles = () => ({
  heading: {
    backgroundColor: '#E3E3E3',
    border: '1px solid #cccccc',
  },
  buttonsRight: {
    justifyContent: 'flex-end',
  },
});

/*
Child component of GoalList
Parent component of TaskItem and NewTaskItem & GoalTypeDeleteDialog
*/
class GoalType extends Component {
  state = {
    isOpen: false, // Variable for collapsing all sections nested list
    isAdding: false, // Variable for toggling add new step
  };

  // shouldComponentUpdate(prevProps) {
  //   if (this.props.type.task.length !== prevProps.type.task.length) {
  //     this.fetchData(this.props.type.task.length);
  //   }
  //   this.checkForTasks();
  // }

  // Handles collapse on click of any where in the heading
  onHeadingClick = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  // Toggle isAdding
  onAddClick = () => {
    this.setState(prevState => ({ isAdding: !prevState.isAdding }));

    this.props.getGoalList();
  }

  render() {
    const { classes, type } = this.props;

    return (
      <>
        {/* List each section header/type */}

        <ListItem
          button
          onClick={this.onHeadingClick}
          className={classes.heading}
        >
          {/* Toggle between + and - sign when collapsed or open */}
          {this.state.isOpen ? <ExpandLess /> : <ExpandMore />}

          {/* Section Name Text */}
          <ListItemText
            inset
            disableTypography
            primary={<Typography style={{ fontFamily: 'Avenir', fontSize: '20px' }}>{type.title}</Typography>}
          />

          {/* Edit section/type button and input */}
          <TypeEdit type={type} toggleIsEditingType={this.toggleIsEditingType} getGoalList={this.props.getGoalList} />

          {/* On click of delete, here is the component with the dialog box */}
          <GoalTypeDeleteDialog type={type} getGoalList={this.props.getGoalList} />

        </ListItem>

        {/* Area inside the nested list where steps will be listed out */}
        <Collapse in={this.state.isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding style={{ border: '1px solid #cccccc' }}>


            {/* Uncheck all button */}
            {/* <ListItem>
              <UncheckAllButton
                type={type}
                getGoalList={this.props.getGoalList}
              />
            </ListItem> */}

            {/* WIP */}

            <ListItem>
              {this.props.type.task.length
                ? (
                  <UncheckAllButton
                    type={type}
                    getGoalList={this.props.getGoalList}
                  />
                ) : <div>You don&#39;t have any goals in this section yet.  Click the plus to add a goal.</div>
              }
            </ListItem>

            {/* List each task */}
            {type.task.map(task => <TaskItem task={task} key={task.id} getGoalList={this.props.getGoalList} />)}

            {/* Toggle between Add a new task */}
            {/* <ListItem className={classes.buttonsRight}>
              {this.state.isAdding
                ? <NewTaskItem onAddClick={this.onAddClick} typeId={type.id} getGoalList={this.props.getGoalList} />
                : <AddNewTaskButton onAddClick={this.onAddClick} />}
            </ListItem> */}
            {/* WIP */}
            <ListItem className={classes.buttonsRight}>
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
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(GoalType);
