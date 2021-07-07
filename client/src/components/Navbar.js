import {useState} from "react";
import ProjectsList from '../views/ProjectList';
import LanguageSwitcher from './LanguageSwitcher';
import Home from '../views/Home';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import TimeSheetList from "../views/TimesheetList";
import Statistics from "../views/Statistics";

// material ui
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
                    <Tab value={2} label="Timesheets"  to='/ts-list' component={Link}/>
                    <Tab value={3} label="Statistics"  to='/statistics' component={Link}/>
                    <LanguageSwitcher />
                </Tabs>
            </div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/projects" component={ProjectsList} />
                <Route path="/ts-list" component={TimeSheetList} />
                <Route path="/statistics" component={Statistics} />
            </Switch>
        </Router>
    )
}