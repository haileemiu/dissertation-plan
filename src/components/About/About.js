import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Link, Grid } from '@material-ui/core';
import banner from '../../images/home1-1366.jpg';
import Login from '../LoginPage/LoginPage';
import PlanIcon from '../../images/iconplan.svg';
import GoalsIcon from '../../images/icongoals.svg';
import MessageIcon from '../../images/iconmessages.svg';
import CoachIcon from '../../images/iconcoach.svg';

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

  offersSection: {
    marginLeft: 40,
    marginRight: 40,
  },
  offersItems: {
    textAlign: 'center',
  }
});

const AboutPage = (props) => {
  if (props.user.id) {
    return <Redirect to="/coaching" />;
  }

  return (
    <>
      {/* Login banner */}
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

      {/* Offerings Section */}
      <div className={props.classes.offersSection}>

        <div style={{ fontSize: '36px', textAlign: 'center', margin: 20 }}>What Taina offers students</div>
        <Grid container spacing={24}>

          <Grid item xs={3} className={props.classes.offersItems}>
            <img src={PlanIcon} alt="plan" />
            <p style={{ fontSize: '22px' }}>Customizable Dissertation Plan</p>
            <p style={{ fontSize: '16px' }}>Every doctoral journey looks different.  Customize your own plan to visualize and update your process.</p>
          </Grid>

          <Grid item xs={3} className={props.classes.offersItems}>
            <img src={GoalsIcon} alt="goals" />
            <p style={{ fontSize: '22px' }}>Holistic Goal-setting</p>
            <p style={{ fontSize: '16px' }}>Setting goals in all areas of your life puts you in control of your educational and personal well-being.</p>
          </Grid>

          <Grid item xs={3} className={props.classes.offersItems}>
            <img src={MessageIcon} alt="message" />
            <p style={{ fontSize: '22px' }}>Community Message Board</p>
            <p style={{ fontSize: '16px' }}>Higher education doesn't have to be isolating. Ask quations, help others, and erase the stigma around discussion.</p>
          </Grid>

          <Grid item xs={3} className={props.classes.offersItems}>
            <img src={CoachIcon} alt="coach" />
            <p style={{ fontSize: '22px' }}>Affordable Coaching</p>
            <p style={{ fontSize: '16px' }}>Get guidance and answers from someone who has been in your shoes and get help taking control of your education.</p>
          </Grid>

        </Grid>


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
