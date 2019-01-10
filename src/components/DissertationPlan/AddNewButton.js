import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, Button } from '@material-ui/core';

/* Material UI styling */
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
      <div>
        <ListItem className={classes.nested}>
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleAddClick}
            className={classes.addButton}
          >
            Add
          </Button>
        </ListItem>
      </div>
    );
  }
}


AddNewButton.propTypes = {
  classes: PropTypes.shape().isRequired,
  onAddClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddNewButton);