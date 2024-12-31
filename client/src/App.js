import React from 'react';
import Navbar from './components/Navbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './styles/App.scss';
import LoginForm from './components/LoginForm';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5F758E',
    },
    secondary: {
      main: '#5F758E',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <div className="App">
      <Navbar />
      <LoginForm />
    </div>
  </MuiThemeProvider>
);

export default App;
