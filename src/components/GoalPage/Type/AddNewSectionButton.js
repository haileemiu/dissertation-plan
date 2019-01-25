import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';


const styles = theme => ({
  rightText: {
    textAlign: 'right',
  },
});

/*
Child component of GoalList
Sibling component of AddNewSectionInput
*/
class AddNewSectionButton extends Component {
  state = {}

  clickAddSection = () => {
    this.props.toggleAddSection();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Divider />
        <ListItem onClick={this.clickAddSection} className={classes.rightText}>
          {/* <ListItemIcon>
            <Add />
          </ListItemIcon> */}
          <ListItemText inset primary="+ Add Section" />
        </ListItem>
      </div>
    );
  }
}

AddNewSectionButton.propTypes = {
  classes: PropTypes.shape().isRequired,
  toggleAddSection: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddNewSectionButton);
