import React from 'react';
import Navbar from "./components/Navbar";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './styles/App.scss';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#5F758E'
        },
        secondary: {
            main: '#5F758E'
        }
    }
});

class App extends React.Component {
    state = {}

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <Navbar />
                </div>
            </MuiThemeProvider>

        );
    }
}

export default App;
