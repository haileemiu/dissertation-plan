import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '75%',
    margin: 'auto',
  },
  sectionHeadings: {
    textTransform: 'uppercase',
    color: '#16BFD5',
  },
  coachesGrid: {
    flexGrow: 1,
    margin: 'auto',
  },
  contactButton: {
    textTransform: 'capitalize',
    border: '2px solid #16BFD5',
    color: '#16BFD5',
    backgroundColor: 'white',
    borderRadius: 25,
    margin: 30,
    '&:hover': {
      backgroundColor: '#16BFD5',
      color: 'white',
    },
  },

});

const CoachingPageContent = props => (

  <div className={props.classes.root}>
    {/* Coaches Section */}
    <p className={props.classes.sectionHeadings}>Our Coaches</p>
    <div className={props.classes.coachesGrid}>
      <Grid container spacing={24}>

        <Grid item xs={4}>
          <img src="https://via.placeholder.com/140x100" alt="coach" />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum,</p>
        </Grid>

        <Grid item xs={4}>
          <img src="https://via.placeholder.com/140x100" alt="coach" />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum,</p>
        </Grid>

        <Grid item xs={4}>
          <img src="https://via.placeholder.com/140x100" alt="coach" />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum,</p>
        </Grid>

      </Grid>
    </div>

    {/* Define Section */}
    <p className={props.classes.sectionHeadings}>What is coaching?</p>
    <p>The International Coach Federation (ICF) defines coaching as partnering with clients in a thought-provoking and creative process that inspires them to maximize their personal and professional potential.</p>
    <p>Our Dissertation Liberation Coaching Program is an individualized program designed to guide you at all stages of your dissertation process. With a deep understanding of the academy, oppression and trauma, we address academic bumps, emotional labor, &amp; motivation.</p>

    {/* Philosophy Section */}
    <p className={props.classes.sectionHeadings}>Our Coaching Philosophy</p>
    <p>Our framework and practice is grounded in two coaching and healing methods. The first one is the Orange Method (OM) developed by Dr. Joi D. Lewis of Joi Unlimited Coaching and Consulting as part of the Community Coaching Program in Healing Justice. The four main components of the method include mindful leadership, conscious movement, meditation, and emotional liberation.</p>
    <p>The second framework is rooted in Positive Psychology from The Coaching and Positive Psychology (CaPP) Institute developed by Valorie Burton. This program is one of few approved by The International Coaching Federation (ICF). The main components are: mindful listening, direct communication, coaching for resilience, the elements of well-being, character strengths in action, cultivating happiness and positive emotion, action and accountability.</p>
    <p>Dr. Martin Seligman, renowned research and professor at the University of Pennsylvania,  defines positive psychology as "the scientific study of optimal functioning that aims to discover and promote the factor that allow individuals and communities thrive." In other words, the study of what happens when things go right in life. What enables people to thrive in work and life?</p>

    {/* Bulleted Help List */}
    <p className={props.classes.sectionHeadings}>Your Dissertation Liberation Coach Can Help You To:</p>
    <ul>
      <li>Reclaim your writing work space</li>
      <li>Affirm and unzpack emotional labor, impostor syndrome and perfectionism</li>
      <li>Determine short &amp; long-term goals, and prioritize tasks including critical deadlines</li>
      <li>Develop a radical self-care plan</li>
      <li>Unpack emotions and feelings keeping you from completing</li>
      <li>Affirm and validate what you are experiencing with the right amount of tough love</li>
      <li>Re-establish contact with your faculty if you have not been in touch in a long time</li>
      <li>Work with challenging chairpersons and committee members</li>
      <li>Demystify the doctoral process</li>
      <li>Prepare for oral proposal and defense meetings</li>
      <li>Talk with someone who has been through the journey</li>
      <li>Develop templates and exercises to assist your process</li>
      <li>Keep you accountable</li>
      <li>Get to the finish line</li>
    </ul>

    {/* Bottom */}
    <p
      className={props.classes.sectionHeadings}
      style={{ textAlign: 'center', width: '65%', margin: 'auto' }}
    >
      are you tired of not making progress? are you considering quitting your program or simply not finishing?
    </p>

    {/* Button */}
    <div style={{ textAlign: 'center' }}>
      <Button
        className={props.classes.contactButton}
        variant="outlined"
      >
        contact us
      </Button>
    </div>

  </div>
);

CoachingPageContent.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(CoachingPageContent);
