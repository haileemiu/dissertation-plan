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
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

/* Class Component */
class DissertationPlan extends Component {
  /* Global Variables */
  state = {
    open: false, // default all sections closed
    checkedA: false, // default all boxes unchecked
    dissertationPlanList: [],
  };

  /* Life Cycle Events */
  componentDidMount = () => {
    this.getDissertationPlan();
  }

  /* Custom Events */

  // Open and close each section
  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  // Check and uncheck boxes
  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  // Handle retrieving dissertation plan
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

  /* Render Page Content */
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h1>Dissertation Plan</h1>
        {/* TEST WIP */}
        <pre>{JSON.stringify(this.state.dissertationPlanList)}</pre>

        <List
          component="nav"
          subheader={<ListSubheader component="div">My Plan</ListSubheader>}
        >
          {/* List out all the sections from the database */}
          {this.state.dissertationPlanList.map(section => (
            <ListItem button onClick={this.handleClick}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              {/* <ListItemText inset primary="Primary 1" /> */}
              <ListItemText inset primary={section.sections} />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          ))}

          <Collapse in={this.state.open} timeout="auto" unmountOnExit>

            <List component="div" disablePadding>
              {this.state.dissertationPlanList.map(step => (
                <ListItem button className={classes.nested}>
                  <ListItemIcon>

                    <Checkbox
                      checked={this.state.checkedA}
                      onChange={this.handleChange('checkedA')}
                      value={step.steps}
                    />

                  </ListItemIcon>
                  <ListItemText inset primary={step.steps} />
                </ListItem>

              ))}
            </List>


            <button>test</button>
          </Collapse>

        </List> {/* END of entire list */}
      </div>
    );
  }
}

DissertationPlan.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DissertationPlan);
