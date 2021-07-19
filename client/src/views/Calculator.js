import { connect } from "react-redux";
import React, {useState} from "react";

// material-ui
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

function Calculator(props) {
    const [text, setText] = useState('')
    const [characters, calculateCharacters] = useState(0);
    const [pages, calculatePages] = useState(0);

    const handleCalc = e => {
        setText(e.target.value);
        const chars = e.target.value.length;
        const pages = (chars / 1800).toFixed(3);
        calculateCharacters(chars);
        calculatePages(pages)
    };

    const handleClear = () => {
        setText('');
        calculateCharacters(0);
        calculatePages(0)
    };

    return (
        <Container fixed id="main">
            {props.isLoggedIn &&
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className="app-main">
                            <h1>{props.translations.calculator_page_title}</h1>
                            <hr/>
                            <h2>{props.translations.calculator_page_subtitle}</h2>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        className="custom-calc"
                                        label={props.translations.calculator_label}
                                        multiline
                                        rows={10}
                                        variant="outlined"
                                        value={text}
                                        onChange={e => handleCalc(e)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <h2>{props.translations.calculator_label_chars} {characters}</h2>
                                    <h2>{props.translations.calculator_label_pages} {pages}</h2>
                                    <Button onClick={handleClear} color="primary" variant="outlined">
                                        {props.translations.calculator_label_clear}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            }
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        translations: state.translations[state.selectedLanguage]
    }
}

export default connect(mapStateToProps, null)(Calculator)