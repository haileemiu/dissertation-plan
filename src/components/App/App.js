import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../About/About';
import UserPage from '../UserPage/UserPage';
import GoalPage from '../GoalPage/GoalPage';
import DissertationPlan from '../DissertationPlan/DissertationPlan';
import PasswordReset from '../PasswordReset/PasswordReset';
import ForgotPassword from '../LoginPage/ForgotPassword';
import './App.css';

class App extends Component {
  // Can't be a function component because a function can't have a method as a property.
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* ProtectedRoute is a thing that Prime created */}
            {/* exact is the same as exact={true} */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
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
            {/* OTHERWISE (no path!) */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
