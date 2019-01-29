import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { cyan } from '@material-ui/core/colors';
import GoalBanner from './GoalBanner';
import GoalsList from './GoalList';

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

/* This is the parent component for the GoalList */
const GoalPage = props => (
  <>
    <GoalBanner />
    <div className={props.classes.root}>
      <MuiThemeProvider theme={theme}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '28px' }}>Set goals to maximize your productivity and balance your life</p>
          <p style={{ fontSize: '22px' }}>Customize your goals to best reflect your path.</p>
        </div>
        <GoalsList />
      </MuiThemeProvider>
    </div>
  </>
);

GoalPage.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(GoalPage);
