import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import AppBarHeader from './AppBarHeader';


class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // editingUser: {},
      // showEditModal: false,
    };
  }

  componentDidMount() {
    this.props.onUsersFetch();
  }

  render() {
    const {
      users,
    } = this.props;

    const linkStyle = {
      color: '#fff',
      textDecoration: 'none',
    };


    return (
      <div>
        <AppBarHeader />
        <Table onRowSelection={this.handleRowSelection}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Login</TableHeaderColumn>
              <TableHeaderColumn>Full Name</TableHeaderColumn>
              <TableHeaderColumn>Group</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover
            deselectOnClickaway={false}
          >
            {users && users.map(user => (
              <TableRow
                key={user.id}
              // selected={(() => this.isSelected(user))()}
              >
                <TableRowColumn>{user.id}</TableRowColumn>
                <TableRowColumn>{user.login}</TableRowColumn>
                <TableRowColumn>{user.username}</TableRowColumn>
                <TableRowColumn>{user.groupUser}</TableRowColumn>
                <TableRowColumn>{user.email}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    login: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    groupUser: PropTypes.string.isRequired,
    email: PropTypes.string,
  }).isRequired).isRequired,
  onUsersFetch: PropTypes.func.isRequired,
};

export default UsersList;
