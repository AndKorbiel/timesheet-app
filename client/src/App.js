import React from 'react';
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
