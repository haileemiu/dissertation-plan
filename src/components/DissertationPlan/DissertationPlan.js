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
  };

  /* Life Cycle Events */
  componentDidMount = () => {

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

  /* Render Page Content */
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h1>Dissertation Plan</h1>
        <List
          component="nav"
          subheader={<ListSubheader component="div">My Plan</ListSubheader>}
        >

          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText inset primary="Section 1" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                 
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>

                  <Checkbox
                    checked={this.state.checkedA}
                    onChange={this.handleChange('checkedA')}
                    value="checkedA"
                  />

                </ListItemIcon>
                <ListItemText inset primary="Part 1" />
              </ListItem>
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
