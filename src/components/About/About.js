import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
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

const AboutPage = (props) => {
  if (props.user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <div className={props.classes.heroImage}>
        <div className={props.classes.heroText}>
          <h1 style={{ fontSize: '36px' }}>Doctoral students deserve to own their education</h1>
          <h3>Taina is a web-based service offering tools for success, a community forum, and individualized coaching to support you on your educational journey</h3>
          <Login />
          <div style={{ margin: 15 }}>
            <Link href="#register" underline="always" style={{ color: 'white' }}>
              Create a free account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

AboutPage.propTypes = {
  classes: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const StyledAboutPage = withStyles(styles)(AboutPage);
export default connect(mapStateToProps)(StyledAboutPage);
