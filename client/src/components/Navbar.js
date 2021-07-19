import {useState} from "react";
import ProjectsList from '../views/ProjectList';
import LanguageSwitcher from './LanguageSwitcher';
import Calculator from '../views/Calculator';
import Home from '../views/Home';
import { connect } from "react-redux";

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

function Navbar(props) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Router>
            <div className="navbar">
                <Tabs value={value} onChange={handleChange}>
                    <Tab value={0} label={props.translations.menu_home} to='/' component={Link} />
                    <Tab value={1} label={props.translations.menu_projects}  to='/projects' component={Link}/>
                    <Tab value={2} label={props.translations.menu_timesheets}  to='/ts-list' component={Link}/>
                    <Tab value={3} label={props.translations.menu_stats}  to='/statistics' component={Link}/>
                    <Tab value={4} label={props.translations.menu_calc}  to='/calculator' component={Link}/>
                    <LanguageSwitcher />
                </Tabs>
            </div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/projects" component={ProjectsList} />
                <Route path="/ts-list" component={TimeSheetList} />
                <Route path="/statistics" component={Statistics} />
                <Route path="/calculator" component={Calculator} />
            </Switch>
        </Router>
    )
}

const mapStateToProps = state => {
    return {
        translations: state.translations[state.selectedLanguage]
    }
}

export default connect(mapStateToProps, null)(Navbar)