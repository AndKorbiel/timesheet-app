import { useState} from "react";
import { connect } from "react-redux";
import {setLanguage} from '../redux/actions';

// material ui
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function LanguageSwitcher(props) {
    const [isChecked, setCheck] = useState(false)
    const handleChange = () => {
        setCheck(!isChecked)
        if (isChecked) {
            setLang('English')
            props.setLanguage('English')
        } else {
            setLang('Polski')
            props.setLanguage('Polski')
        }
    }

    const [selectedLang, setLang] = useState('English');


    return (
        <FormControlLabel
            control={<Switch checked={isChecked} onChange={handleChange} name="lang"/>}
            label={selectedLang}
        />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: lang => { dispatch(setLanguage(lang)) }
    }
}

export default connect(null, mapDispatchToProps)(LanguageSwitcher)
