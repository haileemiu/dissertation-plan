import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginLeft: 75,
  },

});

/*
Child component of GoalType
Sibling of TypeEdit
*/
class TypeEditButton extends Component {
  handleEditClick = () => {
    this.props.toggleIsEditingType();
  }

  render() {
    const { classes } = this.props;
    return (
      <Button
        size="small"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={this.handleEditClick}
        type="submit"
      >
        Edit section
      </Button>
    );
  }
}

TypeEditButton.propTypes = {
  classes: PropTypes.shape().isRequired,
  toggleIsEditingType: PropTypes.func.isRequired,
};

export default withStyles(styles)(TypeEditButton);
