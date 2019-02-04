import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Link, Grid } from '@material-ui/core';
import banner from '../../images/home1-1366.jpg';
import DPPbanner from '../../images/home2-1920.jpg';
import Login from '../LoginPage/LoginPage';
import PlanIcon from '../../images/iconplan.svg';
import GoalsIcon from '../../images/icongoals.svg';
import MessageIcon from '../../images/iconmessages.svg';
import CoachIcon from '../../images/iconcoach.svg';
import HelpOne from '../../images/home_help1_420.jpg';
import HelpTwo from '../../images/home_help2_420.jpg';
import HelpThree from '../../images/home_help3_420.jpg';

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
    marginTop: 50,
    marginBottom: 70,
  },
  offersItems: {
    textAlign: 'center',
  },
  heroImageDPP: {
    backgroundImage: `url(${DPPbanner})`,
    height: '400px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
  },
  heroTextDPP: {
    textAlign: 'left',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontFamily: 'Avenir-Medium',
    fontWeight: 500,
  },
  '@global': {
    li: {
      margin: '10px 0',
    },
  },
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

      {/* Pain Points Section */}
      <div className={props.classes.heroImageDPP}>
        <div className={props.classes.heroTextDPP}>
          <div style={{ fontSize: '36px', textAlign: 'center', margin: 20 }}>Doctoral Pain Points</div>
          <ul style={{ fontSize: '18px', width: '200%' }}>
            <li>Estimated drop-out rate of 50-60%</li>
            <li>Likelihood of developing anxiety and depression 6 times as high as general population</li>
            <li>Perceived stigma around asking for help or discussing your process with peers</li>
            <li>Common worries such as "How do I conduct my research?" and "Is it normal to hire an editor?"</li>
            <li>High competition for fellowships, grants, and publishings, increasing feelings of isolation</li>
            <li>Feelings of being abandoned by busy staff, and shame in asking for help</li>
            <li>Significant amount of time spent in front of a computer, away from peers and loved ones</li>
          </ul>
        </div>
      </div>

      {/* Help section */}
      <div className={props.classes.offersSection}>
        <div style={{ fontSize: '36px', textAlign: 'center', margin: 20 }}>There is help</div>
        <Grid container spacing={24}>
          <Grid item xs={4} className={props.classes.offersItems}>
            <img src={HelpOne} alt="personalize" />
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>A personalized dissertation plan as well as educational and self-care goals will help you feel more confident and in control.</p>
          </Grid>

          <Grid item xs={4} className={props.classes.offersItems}>
            <img src={HelpTwo} alt="free from isolation" />
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Tearing down the walls of isolation and creating community reminds us that we are stronger in solidarity than we are alone.</p>
          </Grid>

          <Grid item xs={4} className={props.classes.offersItems}>
            <img src={HelpThree} alt="coaching" />
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>We believe individualized coaching should be about getting you back on track without being a financial burden.</p>
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
