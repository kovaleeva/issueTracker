import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RaisedButton, FlatButton, TextField, Divider } from 'material-ui';
import AppBarHeader from '../AppBarHeader';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logUser: {
        password: '',
        email: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleChange(field, value) {
    this.setState({
      logUser: Object.assign({}, this.state.logUser, { [field]: value }),
    });
  }

  handleSignIn() {
    this.props.onSignIn(this.state.logUser);
    this.setState({
      logUser: {
        email: '',
        password: '',
      },
    });
    alert('SIGNIN SUCCES');
  }


  render() {
    const style = {
      margin: 'auto',
      width: '20em',
    };

    return (
      <div>
        <AppBarHeader />
        <div style={style}>
          <TextField
            floatingLabelText="email"
            id="email"
            onChange={(event, newValue) => this.handleChange('email', newValue)}
            floatingLabelStyle={{ color: '#616161' }}
            underlineFocusStyle={{ borderColor: '#616161' }}
            fullWidth
          />
          <TextField
            floatingLabelText="password"
            id="password"
            type="password"
            onChange={(event, newValue) => this.handleChange('password', newValue)}
            floatingLabelStyle={{ color: '#616161' }}
            underlineFocusStyle={{ borderColor: '#616161' }}
            fullWidth
          />
          <RaisedButton
            buttonStyle={{ backgroundColor: '#81C784' }}
            label="Sign In"
            primary
            onClick={this.handleSignIn}
            fullWidth
          />
          <Link to="/signUp">
            <FlatButton
              labelStyle={{ color: '#616161' }}
              label="Sign Up"
              primary
              onClick={this.handleAdd}
              style={{ margin: 2 }}
              fullWidth
            />
          </Link>
          <Divider />
        </div>
      </div>
    );
  }
}
Auth.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

export default Auth;
