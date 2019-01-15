import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { ListItem } from '@material-ui/core';


const styles = theme => ({
  addButton: {
    margin: theme.spacing.unit,
    marginLeft: 75,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
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
      <ListItem className={classes.nested}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleEditClick}
          type="submit"
          value="goalType"
        >
          Edit Section
        </Button>
      </ListItem>
    );
  }
}

TypeEditButton.propTypes = {
  classes: PropTypes.shape().isRequired,
  toggleIsEditingType: PropTypes.func.isRequired,
};

export default withStyles(styles)(TypeEditButton);
