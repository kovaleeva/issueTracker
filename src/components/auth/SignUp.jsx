import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RaisedButton, TextField, MenuItem, SelectField, Divider } from 'material-ui';
import AppBarHeader from '../AppBarHeader';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {
        login: '',
        username: '',
        password: '',
        group: '',
        email: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  componentDidMount() {
    this.props.onGroupsFetch();
  }


  handleChange(field, value) {
    this.setState({
      newUser: Object.assign({}, this.state.newUser, { [field]: value }),
    });
  }

  handleSignUp() {
    const groupID = this.props.groups.find(g => g.group === this.state.newUser.group).id;
    const obj = {
      ...this.state.newUser,
      group: groupID,
    };
    this.props.onSignUp(obj);
    this.setState({
      newUser: {
        login: '',
        username: '',
        password: '',
        group: '',
        email: '',
      },
    });
    alert('SIGNUP SUCCES');
  }

  render() {
    const style = {
      margin: 'auto',
      width: '20em',
    };

    const {
      groups,
    } = this.props;

    const linkStyle = {
      color: '#fff',
      textDecoration: 'none',
    };

    return (
      <div>
        <AppBarHeader />
        <div style={style}>
          <TextField
            floatingLabelText="login"
            id="login"
            value={this.state.newUser.login}
            onChange={(event, newValue) => this.handleChange('login', newValue)}
            floatingLabelStyle={{ color: '#616161' }}
            underlineFocusStyle={{ borderColor: '#616161' }}
            fullWidth
          />
          <TextField
            floatingLabelText="full name"
            id="username"
            value={this.state.newUser.username}
            onChange={(event, newValue) => this.handleChange('username', newValue)}
            floatingLabelStyle={{ color: '#616161' }}
            underlineFocusStyle={{ borderColor: '#616161' }}
            fullWidth
          />
          <TextField
            floatingLabelText="email"
            id="email"
            type="email"
            value={this.state.newUser.email}
            onChange={(event, newValue) => this.handleChange('email', newValue)}
            floatingLabelStyle={{ color: '#616161' }}
            underlineFocusStyle={{ borderColor: '#616161' }}
            fullWidth
          />
          <SelectField
            id="groups"
            value={this.state.newUser.group}
            onChange={(event, key, payload) => this.handleChange('group', payload)}
            floatingLabelText="Group"
            hintText="group"
            fullWidth
          >
            {groups && groups.map(i => (
              <MenuItem key={i.id} value={i.group} primaryText={i.group} />
            ))}
          </SelectField>
          <TextField
            floatingLabelText="password"
            id="password"
            type="password"
            value={this.state.newUser.password}
            onChange={(event, newValue) => this.handleChange('password', newValue)}
            floatingLabelStyle={{ color: '#616161' }}
            underlineFocusStyle={{ borderColor: '#616161' }}
            fullWidth
          />
          <Link to="/" style={linkStyle}>
            <RaisedButton
              buttonStyle={{ backgroundColor: '#81C784' }}
              label="Sign Up"
              primary
              onClick={this.handleSignUp}
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


SignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired,
  onGroupsFetch: PropTypes.func.isRequired,
};


export default SignUp;
