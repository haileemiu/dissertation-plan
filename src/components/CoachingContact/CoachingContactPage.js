import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { teal, red } from '@material-ui/core/colors';
import CoachingBanner from './CoachingBanner';
import ContactForm from './ContactForm';
import CoachingPageContent from './CoachingPageContent';

/* Material UI styling */
const styles = () => ({
  rootHeroImage: {
    width: '100%',
    backgroundColor: '#A4DDE6',
    padding: 20,
    paddingBottom: '100px',
    margin: 'auto',
    fontFamily: 'Avenir',


    height: 'auto',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
  },
  heroText: {
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontFamily: 'Avenir-Medium',
    fontWeight: 500,
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

/*
Parent of ContactForm
*/
const CoachingContactPage = props => (
  <>
    <CoachingBanner />
    <MuiThemeProvider theme={theme}>
      <div className={props.classes.rootHeroImage}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '28px' }}>We&apos;re ready to partner with you.</p>
          <p style={{ fontSize: '22px' }}>Send us a message and we&apos;ll get in touch with you about your coaching options.</p>
        </div>
        <ContactForm className={props.classes.heroText} />
      </div>
      <CoachingPageContent />
    </MuiThemeProvider>
  </>
);

CoachingContactPage.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(CoachingContactPage);
