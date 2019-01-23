import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import banner from '../../images/banner-displan-1920.jpg';

const styles = theme => ({
  center: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
});

const DissertationBanner = props => (
  <>
    {/* <img style={{ backgroundImage: { banner } }} alt="plants" /> */}
    <img src={banner} alt="plants" className={props.classes.center} />
  </>

);


DissertationBanner.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(DissertationBanner);
