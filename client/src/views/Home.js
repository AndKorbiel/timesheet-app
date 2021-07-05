// material UI
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TimeSheetInputForm from "../components/TimeSheetInputForm";

export default function Home() {
    return (
        <Container fixed id="main">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className="app-main">
                        <h1>Welcome in timesheet app</h1>
                        <hr />
                        <h2>Please insert your work data:</h2>
                        <TimeSheetInputForm />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
};