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
import Divider from '@material-ui/core/Divider';

import SectionStep from './SectionStep';
import NewSectionStep from './NewSectionStep';
import AddNewButton from './AddNewButton';

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
    const { section } = this.props;

    return (
      <>
        {/* Section Headings */}
        <Divider />
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
            {section.step.map(step => <SectionStep step={step} key={step.id} getDissertationPlan={this.props.getDissertationPlan} />)}

            {/* Add a new step */}
            {/* If isAdding is true, render NewSectionStep */}
            {/* If isAdding is false, render AddNewButton */}
            {this.state.isAdding ? <NewSectionStep onAddClick={this.onAddClick} sectionId={section.id} getDissertationPlan={this.props.getDissertationPlan} /> : <AddNewButton onAddClick={this.onAddClick} />}
            {/* <NewSectionStep sectionId={section.id} getDissertationPlan={this.props.getDissertationPlan} /> */}
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
