import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, FlatButton, TextField, SelectField, MenuItem } from 'material-ui';

class EditIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      issue: props.issue,
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.props.onStatusFetch();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      issue: nextProps.issue,
    });
  }

  handleClose() {
    this.props.onClose();
  }

  handleChange(field, value) {
    this.setState({
      issue: Object.assign({}, this.state.issue, { [field]: value }),
    });
  }

  handleDelete() {
    this.props.onDeleteIssue(this.state.issue.id);
    this.props.onClose();
  }

  handleEdit() {
    const status = this.props.status.find(s => s.status === this.state.issue.status).id;
    const obj = {
      status,
      id: this.state.issue.id,
      title: this.state.issue.title,
      description: this.state.issue.description,
    };

    this.props.onEditIssue(obj);
    this.props.onClose();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        primary
        onClick={this.handleDelete}
      />,
      <FlatButton
        label="Submit"
        primary
        onClick={this.handleEdit}
      />,
    ];

    const {
      open,
      onClose,
      status,
    } = this.props;

    const {
      issue,
    } = this.state;

    return (
      <Dialog
        title="Edit issue"
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={onClose}
      >
        <TextField
          defaultValue={this.props.issue.title}
          floatingLabelText="Title"
          id="title"
          fullWidth
          onChange={(event, newValue) => this.handleChange('title', newValue)}
        />
        <SelectField
          id="status"
          value={this.state.issue.status}
          onChange={(event, key, payload) => this.handleChange('status', payload)}
          floatingLabelText="Status"
          hintText="Status"
          fullWidth
        >
          {status && status.map(statusItem => (
            <MenuItem
              key={statusItem.id}
              value={statusItem.status}
              primaryText={statusItem.status}
            />
          ))}
        </SelectField>
        <TextField
          floatingLabelText="Description"
          onChange={(event, newValue) => this.handleChange('description', newValue)}
          defaultValue={issue.description}
          id="description"
          multiLine
          fullWidth
          rows={6}
          rowsMax={16}
        />
      </Dialog>
    );
  }
}

EditIssue.propTypes = {
  onClose: PropTypes.func.isRequired,
  onEditIssue: PropTypes.func.isRequired,
  onDeleteIssue: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onStatusFetch: PropTypes.func.isRequired,
};

export default EditIssue;
