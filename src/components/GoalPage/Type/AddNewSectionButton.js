import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';


const styles = theme => ({

  addSection: {
    textAlign: 'right',
    backgroundColor: '#E3E3E3',
    border: '1px solid #cccccc',
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
        <ListItem onClick={this.clickAddSection} className={classes.addSection}>
          <ListItemText inset primary={<Typography style={{ fontFamily: 'Avenir', fontSize: '20px' }}>+ Add Section</Typography>}/>
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
