import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ListItem } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

/* Material UI styling */
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
    // fontSize: '40px',
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
          <Fab
            size="small"
            color="primary"
            aria-label="Add"
            className={classes.margin}
            onClick={this.handleAddClick}
          >
            <AddIcon />
          </Fab>
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
