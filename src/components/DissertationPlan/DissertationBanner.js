import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import banner from '../../images/banner-displan-1920.jpg';


const styles = () => ({
  heroImage: {
    backgroundImage: `url(${banner})`,
    height: '300px',
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
        <h1 style={{ fontSize: '36px' }}>A Roadmap is Important on Any Journey</h1>
        <h3>Building your own personal dissertation plan can help you stay on track and take control of your doctoral journey</h3>
      </div>
    </div>
  </>

);


DissertationBanner.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(DissertationBanner);
