import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import LanguageSwitcher from './LanguageSwitcher';
import ProjectsList from '../views/ProjectList';
import Calculator from '../views/Calculator';
import Home from '../views/Home';
import TimeSheetList from '../views/TimesheetList';
import Statistics from '../views/Statistics';

// material ui
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function Navbar() {
  const [value, setValue] = useState(0);

  const { translations } = useSelector((state) => ({
    translations: state.translations[state.selectedLanguage],
  }));

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <div className="navbar">
        <Tabs value={value} onChange={handleChange}>
          <Tab
            value={0}
            label={translations.menu_home}
            to="/"
            component={Link}
          />
          <Tab
            value={1}
            label={translations.menu_projects}
            to="/projects"
            component={Link}
          />
          <Tab
            value={2}
            label={translations.menu_timesheets}
            to="/ts-list"
            component={Link}
          />
          <Tab
            value={3}
            label={translations.menu_stats}
            to="/statistics"
            component={Link}
          />
          <Tab
            value={4}
            label={translations.menu_calc}
            to="/calculator"
            component={Link}
          />
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
  );
}

export default Navbar;
