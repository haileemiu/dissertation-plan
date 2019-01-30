import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ListItem } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';

/* Material UI styling */
const styles = theme => ({
  addButton: {
    margin: theme.spacing.unit,
    fontSize: '40px',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
    justifyContent: 'flex-end',
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
          <AddCircle
            color="primary" // from Mui Theme Provider on DissertationPlan component
            variant="contained"
            onClick={this.handleAddClick}
            className={classes.addButton}
          />

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
