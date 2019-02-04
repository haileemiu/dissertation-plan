import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


// A Custom Wrapper Component -- This will keep our code DRY.
// Responsible for watching redux state, and returning an appropriate component
// API for this component is the same as a regular route

const ProtectedRoute = (props) => {
  const ComponentToProtect = props.component;

  return (
    <Route
      exact={props.exact}
      path={props.path}
      render={() => (props.user.id ? <ComponentToProtect /> : <Redirect to="/about" />)}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  user: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  loginMode: state.loginMode,
});

export default connect(mapStateToProps)(ProtectedRoute);
