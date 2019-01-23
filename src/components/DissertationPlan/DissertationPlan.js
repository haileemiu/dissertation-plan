import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import DissertationList from './DissertationList';
import { cyan } from '@material-ui/core/colors';

/* Material UI styling */
const styles = theme => ({
  root: {
    width: '50%',
    maxWidth: 1400,
    backgroundColor: theme.palette.background.paper,
    padding: 20,
    margin: 'auto',
    fontFamily: 'Avenir',
  },
});

const theme = createMuiTheme({
  palette: {
    primary: cyan,
  },
});

/* This is the parent component for the dissertation plan list */
const DissertationPlan = props => (
  <div className={props.classes.root}>
    <MuiThemeProvider theme={theme}>
      <h1>Dissertation Plan</h1>
      <DissertationList />
    </MuiThemeProvider>
  </div>
);

DissertationPlan.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(DissertationPlan);
