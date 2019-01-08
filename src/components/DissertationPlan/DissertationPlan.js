import React, { Component } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Checkbox from '@material-ui/core/Checkbox';


/* Material UI styling */
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 1400,
    backgroundColor: theme.palette.background.paper,
    padding: 20,
    margin: 'auto',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

/* Class Component */
class DissertationPlan extends Component {
  /* Global Variables */
  state = {
    dissertationPlanList: [],
    // WIP
    addNewStep: {
      sectionId: null,
      value: '',
    },
  };

  /* Life Cycle Events */
  componentDidMount = () => {
    this.getDissertationPlan();
  }

  /* Custom Events */

  // Handle retrieving dissertation plan //
  getDissertationPlan = () => {
    axios.get('/api/dissertation')
      .then(this.getDissertationPlanSuccess)
      .catch(this.getDissertationPlanError);
  }

  // On Success of getDissertationPlan
  getDissertationPlanSuccess = (response) => {
    this.setState({ dissertationPlanList: response.data });
  }

  // On Error of getDissertationPlan
  getDissertationPlanError = (err) => {
    console.log('Error in retrieving sections from api:', err);
    alert('Error in getting your saved sections');
  }
  // END retrieving dissertation plan //

  // Open and close each section collapsable heading
  handleClick = (id, open) => () => {
    const newList = this.state.dissertationPlanList.map((plan) => {
      if (plan.id === id) {
        return { ...plan, open: !open };
      }
      return plan;
    });

    this.setState({ dissertationPlanList: newList });
  };

  // Check and uncheck boxes
  handleCheckBoxChange = stepId => (event) => {
    this.markAsComplete(stepId, event.target.checked);
  };

  // Handle updating completed status //
  markAsComplete = (stepId, stepCompleted) => {
    axios.put(`/api/dissertation/${stepId}`, { completed: stepCompleted })
      .then(this.handleCheckBoxChangeSuccess)
      .catch(this.handleCheckBoxChangeError(stepCompleted));
  }

  // On Success of handleCheckBoxChange
  handleCheckBoxChangeSuccess = (response) => {
    console.log('Success marked completed:', response);
  }

  // On Error of handleCheckBoxChange
  handleCheckBoxChangeError = (err) => {
    console.log('Error in marking complete:', err);
    // TO DO
    // Set visual state back to unchecked if update fails
  }
  // END updating completed status //

  // WIP
  // handleInputChangeAddNew
  handleInputChangeAddNew = sectionId => (event) => {
    this.setState({ addNewStep: { sectionId, value: event.target.value } });
  }

  // Handle add new step //
  handleAddNewStep = (event) => {
    event.preventDefault();
    axios.post('/api/dissertation', { id: this.state.addNewStep.sectionId, name: this.state.addNewStep.value })
      .then(this.handleAddNewStepSuccess)
      .catch(this.handleAddNewStepError);
  }

  // On Success of handleAddNewStep
  handleAddNewStepSuccess = (response) => {
    console.log('Success step added:', response);
    this.getDissertationPlan();
  }

  // On Error of handleAddNewStep
  handleCheckBoxChangeEhandleAddNewStepErrorrror = (err) => {
    console.log('Error in adding step:', err);
  }
  // END add new step //


  /* Render Page Content */
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h1>Dissertation Plan</h1>
        <div>
          <List
            component="nav"
            subheader={<ListSubheader component="div">My Plan</ListSubheader>}
          >
            {this.state.dissertationPlanList.map(section => (
              <div>

                <ListItem button onClick={this.handleClick(section.id, section.open)}>

                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>

                  {/* Section Name */}
                  <ListItemText inset primary={section.name} />
                  {section.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                {/* Steps listed out */}
                <Collapse in={section.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>

                    {/* List steps */}
                    {section.step.map(step => (
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>

                          {/* Checkbox */}
                          <Checkbox
                            type="checkbox"
                            defaultChecked={step.completed}
                            onChange={this.handleCheckBoxChange(step.id)}
                            value={step.completed}
                          />

                        </ListItemIcon>
                        <ListItemText inset primary={step.name} />
                      </ListItem>
                    ))}

                    {/* WIP */}
                    <ListItem>
                      <form onSubmit={this.handleAddNewStep}>
                        <input
                          type="text"
                          name="addNew"
                          // value={}
                          onChange={this.handleInputChangeAddNew(section.id)}
                        />
                        <input
                          type="submit"
                          value="Add New"
                        />
                      </form>
                    </ListItem>

                  </List>
                </Collapse>
              </div>
            ))}
          </List>
          {/* <pre>{JSON.stringify(this.state.dissertationPlanList, null, 2)}</pre> */}
        </div>
      </div>
    );
  }
}

DissertationPlan.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DissertationPlan);
