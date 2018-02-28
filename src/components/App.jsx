import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { renderRoutes } from 'react-router-config';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        {renderRoutes(this.props.route.routes)}
      </MuiThemeProvider>
    );
  }
}

export default App;
