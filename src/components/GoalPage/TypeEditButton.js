import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class TypeEditButton extends Component {
  state = {}

  render() {
    return (
      <Button
        size="small"
        variant="contained"
        color="primary"
        // className={classes.button}
        type="submit"
        value="Add New"
      >
      Edit Section
      </Button>
    );
  }
}

export default TypeEditButton;
