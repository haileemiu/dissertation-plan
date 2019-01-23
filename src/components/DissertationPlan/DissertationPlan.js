import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { cyan } from '@material-ui/core/colors';
import DissertationList from './DissertationList';
import DissertationBanner from './DissertationBanner';
// import banner from '../../images/banner-displan-1920.jpg';

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
  // center: {
  //   display: 'block',
  //   marginLeft: 'auto',
  //   marginRight: 'auto',
  //   width: '100%',
  // },
});

const theme = createMuiTheme({
  palette: {
    primary: cyan,
  },
});

/* This is the parent component for the dissertation plan list */
const DissertationPlan = props => (
  <>
    <DissertationBanner />
    <div className={props.classes.root}>
      <MuiThemeProvider theme={theme}>

        <div style={{ textAlign: 'center' }}>
          <h2>Your path is unique.</h2>
          <h3>Customize your dissertation plan to reflect your process.</h3>
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
