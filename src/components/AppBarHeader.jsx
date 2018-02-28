import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, AppBar, IconButton, IconMenu, FlatButton } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SvgIcon from 'material-ui/SvgIcon';


const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
};

const HomeIcon = props => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

const Login = props => (
  <FlatButton {...this.props} label="Login" />
);

const Logged = props => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <Link to="/issues" style={linkStyle}> <MenuItem primaryText="Issues" /> </Link>
    <Link to="/users" style={linkStyle}> <MenuItem primaryText="Users for Admin" /> </Link>
    <Link to="/history" style={linkStyle}> <MenuItem primaryText="History" /> </Link>
    <Link to="/" style={linkStyle}> <MenuItem primaryText="Sign out" /> </Link>
  </IconMenu>
);

Logged.muiName = 'IconMenu';


class AppBarHeader extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <AppBar
        style={{ backgroundColor: '#616161' }}
        title={<Link to="/" style={linkStyle}> ISSUE TRACKER </Link>}
        iconElementLeft={
          <Link to="/" style={linkStyle}>
            <HomeIcon
              color="white"
              style={{
                width: 44,
                height: 44,
              }}
            />
          </Link>
        }
        iconElementRight={<Logged />}
      // iconElementRight={this.state.logged ? <Logged /> : <Login />}
      />
    );
  }
}

export default AppBarHeader;
