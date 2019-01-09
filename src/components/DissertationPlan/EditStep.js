import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit,
    fontSize: 25,
  },
});

/* This is the child component of SectionStep */
const EditStep = props => (
  <div>
    <EditIcon className={props.classes.icon} />
  </div>
);

EditStep.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(EditStep);
