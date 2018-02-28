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
import AddIssue from './AddIssue';
import EditIssue from './EditIssue';
import AppBarHeader from '../AppBarHeader';

class IssuesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingIssue: {},
      showEditModal: false,
    };

    this.onAddIssue = this.onAddIssue.bind(this);
    this.onEditIssue = this.onEditIssue.bind(this);
    this.onDeleteIssue = this.onDeleteIssue.bind(this);
    this.onOpenEditIssue = this.onOpenEditIssue.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  componentDidMount() {
    this.props.onIssuesFetch();
  }

  onAddIssue(issue) {
    this.props.onAddIssue(issue);
  }

  onEditIssue(issue) {
    this.props.onEditIssue(issue);
  }

  onDeleteIssue(issue) {
    this.props.onDeleteIssue(issue);
  }

  onOpenEditIssue(issue) {
    this.setState({
      editingIssue: issue,
      showEditModal: true,
    });
  }

  handleRowSelection(selectedRow) {
    const editingIssue = this.props.issues.find((issue, index) => index === selectedRow[0]);
    this.setState({ editingIssue, showEditModal: true });
  }

  isSelected(issue) {
    // this.onOpenEditIssue(issue);
    // this.state.selected.indexOf(issue.id) !== -1;
    return this.state.editingIssue && this.state.editingIssue.id === issue.id;
  }

  render() {
    const {
      issues,
      types,
      status,
    } = this.props;

    return (
      <div>
        <AppBarHeader />
        <AddIssue
          onAddIssue={this.onAddIssue}
          onTypesFetch={this.props.onTypesFetch}
          types={this.props.types}
        />
        <EditIssue
          open={this.state.showEditModal}
          issue={this.state.editingIssue || {}}
          onClose={() => this.setState({ editingIssue: {}, showEditModal: false })}
          onEditIssue={this.onEditIssue}
          onDeleteIssue={this.onDeleteIssue}
          onStatusFetch={this.props.onStatusFetch}
          status={this.props.status}
        />
        <Table onRowSelection={this.handleRowSelection}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
              <TableHeaderColumn>Type</TableHeaderColumn>
              <TableHeaderColumn>Assigned</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
              <TableHeaderColumn>Modified</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover
            deselectOnClickaway={false}
          >
            {issues && issues.map(issue => (
              <TableRow key={issue.id} selected={(() => this.isSelected(issue))()}>
                <TableRowColumn>{issue.id}</TableRowColumn>
                <TableRowColumn>{issue.title}</TableRowColumn>
                <TableRowColumn>{issue.status}</TableRowColumn>
                <TableRowColumn>{issue.type}</TableRowColumn>
                <TableRowColumn>{issue.assignedBy}</TableRowColumn>
                <TableRowColumn>{issue.description}</TableRowColumn>
                <TableRowColumn>{issue.last_update}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

IssuesList.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    assignedBy: PropTypes.string,
    last_update: PropTypes.string,
    description: PropTypes.string,
  }).isRequired).isRequired,
  onIssuesFetch: PropTypes.func.isRequired,
  onTypesFetch: PropTypes.func.isRequired,
  onStatusFetch: PropTypes.func.isRequired,
  onAddIssue: PropTypes.func.isRequired,
  onEditIssue: PropTypes.func.isRequired,
  onDeleteIssue: PropTypes.func.isRequired,
};

export default IssuesList;
