import {
  connect,
} from 'react-redux';

import {
  fetchIssuesAsync,
  fetchTypesAsync,
  fetchStatusAsync,
  addIssue,
  editIssue,
  deleteIssue,
} from '../actions/index';

// components
import IssuesList from '../components/issues/IssuesList';

const mapDispatchToProps = dispatch => ({
  onIssuesFetch: () => dispatch(fetchIssuesAsync()),
  onTypesFetch: () => dispatch(fetchTypesAsync()),
  onStatusFetch: () => dispatch(fetchStatusAsync()),
  onAddIssue: issue => dispatch(addIssue(issue)),
  onEditIssue: issue => dispatch(editIssue(issue)),
  onDeleteIssue: issue => dispatch(deleteIssue(issue)),
});

const mapStateToProps = state => ({
  issues: state.issues.issues,
  types: state.issues.types,
  status: state.issues.status,
});

const IssuesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssuesList);

export default IssuesContainer;
