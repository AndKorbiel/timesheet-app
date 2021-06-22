import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../components/CustomTable";

export default function TimeSheetList() {
    const testList = [{title: 'adsada', desc: 'cxzcz'}, {title: '2 adsada', desc: '2 cxzcz'}]

    return (
        <Container fixed id="main">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper>
                        <h1>Timesheets list</h1>
                        <CustomTable columns={["id", "Name", "Description"]} list={testList} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}