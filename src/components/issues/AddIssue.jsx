import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RaisedButton, Dialog, FlatButton, TextField, SelectField, MenuItem } from 'material-ui';

class AddIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      issue: {
        title: '',
        description: '',
        typeID: '',
      },
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.onTypesFetch();
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleChange(field, value) {
    this.setState({
      issue: Object.assign({}, this.state.issue, { [field]: value }),
    });
  }

  handleAdd() {
    const typeID = this.props.types.find(t => t.type === this.state.issue.types).id;
    const obj = {
      ...this.state.issue,
      typeID,
    };
    this.setState({
      open: false,
      issue: {
        title: '',
        description: '',
        typeID: '',
      },
    });
    this.props.onAddIssue(obj);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        onClick={this.handleAdd}
      />,
    ];

    const { types } = this.props;

    return (
      <div>
        <div style={{ margin: '1em 0em' }}>
          <RaisedButton
            label="Add Issue"
            onClick={this.handleOpen}
            buttonStyle={{ backgroundColor: '#00796B' }}
            labelStyle={{ color: 'white' }}
          />
        </div>
        <Dialog
          title="Add issue"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText="Title"
            id="title"
            fullWidth
            onChange={(event, newValue) => this.handleChange('title', newValue)}
          />
          <SelectField
            id="types"
            value={this.state.issue.types}
            onChange={(event, key, payload) => this.handleChange('types', payload)}
            floatingLabelText="Type"
            hintText="Type"
            fullWidth
          >
            {types && types.map(i => (
              <MenuItem key={i.id} value={i.type} primaryText={i.type} />
            ))}
          </SelectField>
          <TextField
            floatingLabelText="Description"
            id="description"
            onChange={(event, newValue) => this.handleChange('description', newValue)}
            multiLine
            fullWidth
            rows={6}
            rowsMax={16}
          />
        </Dialog>
      </div>
    );
  }
}

AddIssue.propTypes = {
  onAddIssue: PropTypes.func.isRequired,
  onTypesFetch: PropTypes.func.isRequired,
};

export default AddIssue;
