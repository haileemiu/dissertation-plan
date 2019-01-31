import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { teal, red } from '@material-ui/core/colors';
import CoachingBanner from './CoachingBanner';
import ContactForm from './ContactForm';

/* Material UI styling */
const styles = theme => ({
  root: {
    width: '75%',
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
  typography: {
    useNextVariants: true,
  },
});

const CoachingContactPage = props => (
  <>
    <CoachingBanner />
    <div className={props.classes.root}>
      <MuiThemeProvider theme={theme}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '28px' }}>We&apos;re ready to partner with you.</p>
          <p style={{ fontSize: '22px' }}>Send us a message and we&apos;ll get in touch with you about your coaching options.</p>
        </div>
        <ContactForm />
      </MuiThemeProvider>
    </div>
  </>
);

CoachingContactPage.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(CoachingContactPage);
