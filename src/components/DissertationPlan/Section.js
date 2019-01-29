import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons/';

import SectionStep from './SectionStep';
import NewSectionStep from './NewSectionStep';
import AddNewButton from './AddNewButton';

const styles = theme => ({

});

/*
This is the child component of DissertationList
And the parent component of SectionStep and NewSectionStep
*/
class Section extends Component {
  state = {
    isOpen: false, // Variable for collapsing all sections nested list
    isAdding: false, // Variable for toggling add new step
  };

  // Handles collapse on click of any where in the heading
  onHeadingClick = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  // Toggle isAdding
  onAddClick = () => {
    this.setState(prevState => ({ isAdding: !prevState.isAdding }));
  }

  render() {
    // const { classes } = this.props;
    const { section } = this.props;

    return (
      <>
        {/* Section Headings */}
        <Divider />
        <ListItem button onClick={this.onHeadingClick}>
          {this.state.isOpen ? <ExpandLess /> : <ExpandMore />}
          {/* <ListItemIcon>
            <StarBorder />
          </ListItemIcon> */}

          {/* Section Name Text */}
          <ListItemText
            inset
            // style={{ paddingLeft: '0%' }}
            disableTypography
            primary={<Typography style={{ fontFamily: 'Avenir', fontSize: '20px' }}>{section.name}</Typography>}
          />
   

        </ListItem>

        {/* Area inside the nested list where steps will be listed out */}
        <Collapse in={this.state.isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

            {/* List each step */}
            {section.step.map(step => <SectionStep step={step} key={step.id} getDissertationPlan={this.props.getDissertationPlan} />)}

            {/* Add a new step */}
            {/* If isAdding is true, render NewSectionStep */}
            {/* If isAdding is false, render AddNewButton */}
            {this.state.isAdding ? <NewSectionStep onAddClick={this.onAddClick} sectionId={section.id} getDissertationPlan={this.props.getDissertationPlan} /> : <AddNewButton onAddClick={this.onAddClick} />}
          </List>
        </Collapse>

      </>
    );
  }
}

Section.propTypes = {
  classes: PropTypes.shape().isRequired,
  section: PropTypes.shape().isRequired,
  getDissertationPlan: PropTypes.func.isRequired,
};

export default withStyles(styles)(Section);
