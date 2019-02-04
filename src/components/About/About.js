import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import banner from '../../images/home1-1366.jpg';
import Login from '../LoginPage/LoginPage';


const styles = () => ({
  heroImage: {
    backgroundImage: `url(${banner})`,
    height: '500px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
  },
  heroText: {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontFamily: 'Avenir-Medium',
    fontWeight: 500,
  },
});

const DissertationBanner = props => (
  <>
    <div className={props.classes.heroImage}>
      <div className={props.classes.heroText}>
        <h1 style={{ fontSize: '36px' }}>Doctoral students deserve to own their education</h1>
        <h3>Taina is a web-based service offering tools for success, a community forum, and individualized coaching to support you on your educational journey</h3>
        <Login />
      </div>
    </div>
  </>

);


DissertationBanner.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(DissertationBanner);
