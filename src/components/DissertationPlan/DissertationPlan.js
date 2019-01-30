import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { teal, red } from '@material-ui/core/colors';

import DissertationList from './DissertationList';
import DissertationBanner from './DissertationBanner';

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
    primary: teal,
    secondary: red,
  },
});

/* This is the parent component for the dissertation plan list */
const DissertationPlan = props => (
  <>
    <DissertationBanner />
    <div className={props.classes.root}>
      <MuiThemeProvider theme={theme}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '28px' }}>Your path is unique.</p>
          <p style={{ fontSize: '22px' }}>Customize your dissertation plan to reflect your process.</p>
        </div>
        <DissertationList />
      </MuiThemeProvider>
    </div>
  </>
);

DissertationPlan.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(DissertationPlan);
