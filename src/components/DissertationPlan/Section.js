import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import SectionStep from './SectionStep';
import NewSectionStep from './NewSectionStep';

/*
This is the child component of DissertationList
And the parent component of SectionStep and NewSectionStep
*/
class Section extends Component {
  state = {
    isOpen: false, // Variable for collapsing all sections nested list
  };

  // Handles collapse on click of any where in the heading
  onHeadingClick = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const { section } = this.props;

    return (
      <>
        {/* Section Headings */}
        <ListItem button onClick={this.onHeadingClick}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>

          {/* Section Name Text */}
          <ListItemText inset primary={section.name} />
          {section.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        {/* Area inside the nested list where steps will be listed out */}
        <Collapse in={this.state.isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

            {/* List each step */}
            {section.step.map(step => <SectionStep step={step} key={step.id} />)}

            {/* Add a new step */}
            <NewSectionStep sectionId={section.id} getDissertationPlan={this.props.getDissertationPlan} />
          </List>
        </Collapse>
      </>
    );
  }
}

Section.propTypes = {
  section: PropTypes.shape().isRequired,
  getDissertationPlan: PropTypes.func.isRequired,
};

export default Section;
