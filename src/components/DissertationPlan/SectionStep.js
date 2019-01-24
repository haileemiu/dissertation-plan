import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import StepText from './StepText';
import StepEdit from './StepEdit';

/* Material UI styling */
const styles = theme => ({
  sectionStep: {
    paddingLeft: theme.spacing.unit,
  },
});

/*
This is the child component of Section
And a parent component of StepEdit and StepText
*/
class SectionStep extends Component {
  state = {
    isEditing: false,
  }

  toggleIsEditing = () => {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }));
  }

  render() {
    const { classes, step } = this.props;

    return (
      // Holds the individual step
      <ListItem button disableTouchRipple className={classes.sectionStep}>
        {/* If isEditing is false, render StepText */}
        {/* If isEditing is true, render EditStep */}
        {this.state.isEditing
          ? <StepEdit step={step} toggleIsEditing={this.toggleIsEditing} getDissertationPlan={this.props.getDissertationPlan} />
          : <StepText step={step} toggleIsEditing={this.toggleIsEditing} getDissertationPlan={this.props.getDissertationPlan} />}
      </ListItem>
    );
  }
}

SectionStep.propTypes = {
  step: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
  getDissertationPlan: PropTypes.func.isRequired,
};

export default withStyles(styles)(SectionStep);
