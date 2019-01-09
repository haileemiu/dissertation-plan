import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 25,
  },
});

class SectionStep extends Component {
  onChange = (event) => {
    axios.put(`/api/dissertation/${this.props.step.id}/completed`, { completed: event.target.checked })
      .then(this.handleChangeSuccess)
      .catch(this.handleChangeError);
  }

  onChangeSuccess = (response) => {
    console.log('Success marked completed:', response);
  }

  onChangeError = (err) => {
    console.log('Error in marking complete:', err);
  }

  render() {
    const { classes, step } = this.props;

    return (
      <ListItem button className={classes.nested}>
        <ListItemIcon>

          {/* Checkbox */}
          <Checkbox
            type="checkbox"
            defaultChecked={step.completed}
            onChange={this.onChange}
            value={step.completed}
          />

        </ListItemIcon>
        <ListItemText inset primary={step.name} />
        <DeleteIcon className={classes.icon} />
        <EditIcon className={classes.icon} />
      </ListItem>
    );
  }
}

SectionStep.propTypes = {
  step: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(SectionStep);
