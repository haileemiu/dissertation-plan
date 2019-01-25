import React from 'react';
import { connect } from 'react-redux';

// Component because exists on page and in nav bar
const LogOutButton = props => (
  <button
    type="button"
    // styling is being passed from nav and/or user page
    className={props.className}
    onClick={() => props.dispatch({ type: 'LOGOUT' })}
  >
    Log Out
  </button>
);

export default connect()(LogOutButton);
