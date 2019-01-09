import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DissertationList from './DissertationList';

/* Material UI styling */
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 1400,
    backgroundColor: theme.palette.background.paper,
    padding: 20,
    margin: 'auto',
  },
});

/* This is the parent component for the dissertation plan list */
const DissertationPlan = props => (
  <div className={props.classes.root}>
    <h1>Dissertation Plan</h1>
    <DissertationList />
  </div>
);

DissertationPlan.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(DissertationPlan);
