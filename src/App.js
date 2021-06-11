import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Navbar from "./components/Navbar";

import './styles/App.scss';

class App extends React.Component {
    state = {}

    render() {
        return (
            <div className="App">
                <Navbar />
            </div>
        );
    }
}

export default App;
