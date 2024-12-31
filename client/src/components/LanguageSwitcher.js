import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../redux/actions';

// material ui
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function LanguageSwitcher(props) {
  const dispatch = useDispatch();

  const [isChecked, setCheck] = useState(false);
  const [selectedLang, setLang] = useState('English');

  const handleChange = () => {
    setCheck(!isChecked);

    if (isChecked) {
      setLang('English');
      dispatch(setLanguage('English'));
    } else {
      setLang('Polski');
      dispatch(setLanguage('Polski'));
    }
  };

  return (
    <FormControlLabel
      className="lang-switch"
      control={
        <Switch checked={isChecked} onChange={handleChange} name="lang" />
      }
      label={selectedLang}
    />
  );
}
