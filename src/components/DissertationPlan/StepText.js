import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import teal from '@material-ui/core/colors/teal';
import {
  ListItemText,
  Checkbox,
  Typography,
} from '@material-ui/core';
// From specific icon folders
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import EditOutlined from '@material-ui/icons/EditOutlined';
import StepTextDialog from './StepTextDialog';


/* Material UI styling */
const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 25,
  },
  root: {
    color: teal.A400,
    '&$checked': {
      color: teal.A400,
    },
  },
  checked: {},
});

/*
This is the child component of SectionStep
And sibling component of StepEdit
*/
class StepText extends Component {
  // Handles checkbox sending to the api
  onChange = (event) => {
    // Note: checked is an html attribute on inputs
    axios.put(`/api/dissertation/${this.props.step.id}/completed`, { completed: event.target.checked })
      .then(this.handleChangeSuccess)
      .catch(this.handleChangeError);
  }

  onChangeSuccess = () => {
    this.props.getDissertationPlan();
  }

  onChangeError = (err) => {
    console.log('Error in marking complete:', err); // TODO: alert user
  }

  // Edit click
  handleEditClick = () => {
    // State handled in SectionStep
    this.props.toggleIsEditing();
  }

  render() {
    const { classes, step } = this.props;

    return (
      // Holds the individual step with edit icon and delete icon
      <>
        <ListItemIcon>

          {/* Checkbox */}
          <Checkbox
            type="checkbox"
            defaultChecked={step.completed} // defaultChecked is necessary
            onChange={this.onChange}
            value="true"
            classes={{
              root: classes.root,
              checked: classes.checked,
            }}
            icon={<CircleUnchecked style={{ fontSize: '40px' }} />}
            checkedIcon={<CircleCheckedFilled style={{ fontSize: '40px' }} />}
          />
        </ListItemIcon>

        {/* Text of step */}
        <ListItemText
          inset

          disableTypography
          primary={<Typography style={{ fontFamily: 'Avenir', fontSize: '18px' }}>{step.name}</Typography>}

        />
        <EditOutlined
          className={classes.icon}
          onClick={this.handleEditClick}
        />

        {/* On click of delete, here is the component with the dialog box */}
        <StepTextDialog step={step} getDissertationPlan={this.props.getDissertationPlan} />
      </>
    );
  }
}

StepText.propTypes = {
  step: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
  toggleIsEditing: PropTypes.func.isRequired,
  getDissertationPlan: PropTypes.func.isRequired,
};

export default withStyles(styles)(StepText);
