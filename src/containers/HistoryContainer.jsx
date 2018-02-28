import {
  connect,
} from 'react-redux';

import {
  fetchHistoryAsync,
} from '../actions/index';

import IssuesHistory from '../components/History';

const mapDispatchToProps = dispatch => ({
  onChangesFetch: () => dispatch(fetchHistoryAsync()),
});

const mapStateToProps = state => ({
  changes: state.historyReducer.changes,
});

const HistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssuesHistory);

export default HistoryContainer;
