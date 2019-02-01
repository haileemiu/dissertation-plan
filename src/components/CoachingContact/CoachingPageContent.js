import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    width: '75%',
    margin: 'auto',

    // textAlign: 'center'
    // padding: 15,
  },
  sectionHeadings: {
    textTransform: 'uppercase',
    color: '#16BFD5',
  },
  coachesGrid: {
    flexGrow: 1,
    // textAlign: 'center',
    // textAlign: 'center'
    // alignItems: 'center',
  },
  items: {
    // // padding: theme.spacing.unit * 2,
    // textAlign: 'center',
  },
});

const CoachingPageContent = props => (
  <div className={props.classes.root}>
    {/* Coaches Section */}
    <p className={props.classes.sectionHeadings}>Our Coaches</p>
    <div className={props.classes.coachesGrid}>
      <Grid container spacing={24}>

        <Grid item xs={4} className={props.classes.items}>
          {/* Image */}
          <img src="https://via.placeholder.com/140x100" alt="coach" />
          {/* Text */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum,
          </p>
        </Grid>

        <Grid item xs={4} className={props.classes.items}>
          {/* Image */}
          <img src="https://via.placeholder.com/140x100" alt="coach" />
          {/* Text */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum,
          </p>
        </Grid>

        <Grid item xs={4} className={props.classes.items}>
          {/* Image */}
          <img src="https://via.placeholder.com/140x100" alt="coach" />
          {/* Text */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum,
          </p>
        </Grid>

      </Grid>
    </div>
  </div>
);

CoachingPageContent.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(CoachingPageContent);
