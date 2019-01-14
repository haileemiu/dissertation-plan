import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ListItem, TextField, Button } from '@material-ui/core';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 25,
  },
});

class TypeEdit extends Component {
  state = {}

  render() {
    const { classes } = this.props;

    return (
      <ListItem className={classes.nested}>
        <form onSubmit={this.editTask} className={classes.container}>
          <TextField
            fullWidth
            className={classes.textField}
            margin="normal"
            // variant="outlined"
            name="name" // needed for state change
            value={this.state.name} // needed for event.target.value
            onChange={this.onInputChange}
          />
          <Button
            size="small"
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
            value="Add New"
          >
            Submit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            className={classes.button}
            type="button"
            onClick={this.props.toggleIsEditing}
          >
            Cancel
          </Button>
        </form>

      </ListItem>
    );
  }
}

TypeEdit.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(TypeEdit);
