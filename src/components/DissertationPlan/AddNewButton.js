import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { FormHelperText } from '@material-ui/core';

/* Material UI styling */
const styles = theme => ({
  icon: {
    margin: theme.spacing.unit,
    fontSize: 25,
    marginRight: 60,
    color: 'primary',
  },

});

/*
This is a child component of Section
And a sibling component of NewSectionStep
*/
class AddNewButton extends Component {
  state = {}

  handleAddClick = () => {
    this.props.onAddClick();
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{ textAlign: 'right' }}>
        <AddCircleIcon
          color="primary"
          className={classes.icon}
          onClick={this.handleAddClick}
        />
      </div>
    );
  }
}


AddNewButton.propTypes = {
  classes: PropTypes.shape().isRequired,
  onAddClick: PropTypes.shape().isRequired,
};

export default withStyles(styles)(AddNewButton);
