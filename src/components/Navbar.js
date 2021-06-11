import { useState} from "react";
import ProjectsList from '../views/ProjectList';
import Home from '../views/Home';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function Navbar() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Router>
            <div className="navbar">
                <Tabs value={value} onChange={handleChange}>
                    <Tab value={0} label="Home" to='/' component={Link} />
                    <Tab value={1} label="Projects"  to='/projects' component={Link}/>
                </Tabs>
            </div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/projects" component={ProjectsList} />
            </Switch>
        </Router>
    )
}