import { connect } from "react-redux";

// material UI
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TimeSheetInputForm from "../components/TimeSheetInputForm";

function Home(props) {
    return (
        <Container fixed id="main">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className="app-main">
                        <h1>{props.translations[props.selectedLanguage].home_page_title}</h1>
                        <hr />
                        <h2>{props.translations[props.selectedLanguage].home_page_subtitle}</h2>
                        <TimeSheetInputForm />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        translations: state.translations,
        selectedLanguage: state.selectedLanguage
    }
}

export default connect(mapStateToProps, null)(Home)