import React, { Component } from 'react';
import {
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';

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
    return (
      <>
        <Divider />
        <ListItem onClick={this.clickAddSection}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText inset primary="Add Section" />
        </ListItem>
      </>
    );
  }
}

AddNewSectionButton.propTypes = {
  toggleAddSection: PropTypes.func.isRequired,
};

export default AddNewSectionButton;
