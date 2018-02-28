import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

class IssuesHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.onChangesFetch();
  }

  render() {
    const {
      changes,
    } = this.props;
    return (
      <div>
        <AppBarHeader />
        <Table onRowSelection={this.handleRowSelection}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Issue</TableHeaderColumn>
              <TableHeaderColumn>Assigned OLD</TableHeaderColumn>
              <TableHeaderColumn>Assigned NEW</TableHeaderColumn>
              <TableHeaderColumn>Changer</TableHeaderColumn>
              <TableHeaderColumn>Status OLD</TableHeaderColumn>
              <TableHeaderColumn>Status NEW</TableHeaderColumn>
              <TableHeaderColumn>Update</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover
            deselectOnClickaway={false}
          >
            {changes && changes.map(i => (
              <TableRow key={i.id}>
                <TableRowColumn>{i.id}</TableRowColumn>
                <TableRowColumn>{i.issueID}</TableRowColumn>
                <TableRowColumn>{i.assignedOld}</TableRowColumn>
                <TableRowColumn>{i.assignedNew}</TableRowColumn>
                <TableRowColumn>{i.changer}</TableRowColumn>
                <TableRowColumn>{i.statusOld}</TableRowColumn>
                <TableRowColumn>{i.statusNew}</TableRowColumn>
                <TableRowColumn>{i.last_update}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

IssuesHistory.propTypes = {
  changes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    issueID: PropTypes.number.isRequired,
    assignedOld: PropTypes.string.isRequired,
    assignedNew: PropTypes.string.isRequired,
    changer: PropTypes.string,
    statusOld: PropTypes.string,
    statusNew: PropTypes.string,
    last_update: PropTypes.string,
  }).isRequired).isRequired,
  onChangesFetch: PropTypes.func.isRequired,
};
export default IssuesHistory;
