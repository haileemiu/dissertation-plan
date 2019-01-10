import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 1400,
    backgroundColor: theme.palette.background.paper,
    padding: 20,
    margin: 'auto',
  },
});

const GoalPage = props => (
  <div className={props.classes.root}>
    <h1>GoalPage</h1>
    {/* <DissertationList /> */}
  </div>
);

GoalPage.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(GoalPage);
