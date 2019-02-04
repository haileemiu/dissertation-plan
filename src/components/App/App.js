import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import AboutPage from '../About/About';
import GoalPage from '../GoalPage/GoalPage';
import DissertationPlan from '../DissertationPlan/DissertationPlan';
import PasswordReset from '../PasswordReset/PasswordReset';
import ForgotPassword from '../LoginPage/ForgotPassword';
import CoachingContactPage from '../CoachingContact/CoachingContactPage';
import Register from '../RegisterPage/RegisterPage';
import './App.css';

class App extends Component {
  // Can't be a function component because a function can't have a method as a property.
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div className="center-image">
          <Nav />
          <Switch>
            <Redirect exact from="/" to="/about" />
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* ProtectedRoute is a thing that Prime created */}
            {/* exact is the same as exact={true} */}
            {/* <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            /> */}
            <ProtectedRoute
              exact
              path="/goal"
              component={GoalPage}
            />
            <ProtectedRoute
              exact
              path="/dissertation"
              component={DissertationPlan}
            />
            <ProtectedRoute
              exact
              path="/coaching"
              component={CoachingContactPage}
            />
            <Route
              exact
              path="/forgot-password"
              component={ForgotPassword}
            />
            <Route
              exact
              path="/password-reset"
              component={PasswordReset}
            />
            <Route
              exact
              path="/register"
              component={Register}
            />
            {/* OTHERWISE (no path!) */}
            <Route render={() => <Redirect to="/about" />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
