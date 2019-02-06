import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, InputBase } from '@material-ui/core';
// import RegisterPage from '../RegisterPage/RegisterPage';


const styles = theme => ({
  // root: {
  //   flexGrow: 1,
  // },
  container: {
    // display: '100%',
    // flexWrap: 'wrap',

  },
  textField: {
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    borderRadius: 50,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    padding: 10,
  },
  button: {
    textTransform: 'none',
    backgroundColor: '#58BCD2',
    color: 'white',
    borderRadius: '50px',
    width: 100,
    height: 50,
  },

});

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();
    // Check for existence
    if (this.state.email && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          email: this.state.email,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    // Link for forgotten password
    // const forgotPasswordLink = `${process.env.PUBLIC_URL}/api/forgot-password`;
    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login} className={classes.container}>
          {/* <h1>Login</h1> */}

          <InputBase
            placeholder="email address"
            type="email"
            className={classes.textField}
            // margin="normal"
            // variant="outlined"
            value={this.state.email}
            onChange={this.handleInputChangeFor('email')}
          />

          <InputBase
            placeholder="password"
            type="password"
            className={classes.textField}
            // margin="normal"
            // variant="outlined"
            value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
          />
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
          >
            Sign In
          </Button>

        </form>
        {/* <center>
          <button
            type="button"
            className="link-button"
            // onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }); }}
          >
            Register
          </button>
        </center> */}

        {/* <a href={forgotPasswordLink}>Forgot password?</a> */}
        {/* <Link to={forgotPasswordLink}>Forgot?</Link> */}
        {/* <a href="#forgot-password">reset password</a> */}
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors,
});

const StyledLoginPage = withStyles(styles)(LoginPage);
export default connect(mapStateToProps)(StyledLoginPage);
