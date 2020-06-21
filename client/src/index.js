import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#FF7315" },
    secondary: { main: "#C73E1D" },
  }
});



ReactDOM.render(<ThemeProvider theme={theme}><App /></ThemeProvider>, document.getElementById('root'));
