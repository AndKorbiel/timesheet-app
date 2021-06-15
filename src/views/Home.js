import CustomInput from "../components/CustomInput";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

export default function Home() {
    return (
        <Container fixed id="main">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper>
                        <h1>Welcome in timesheet app</h1>
                        <hr />
                        <h2>Please insert your work data:</h2>
                        <CustomInput inputs={["Project name", "Hours", "Pages", "Other stuff"]} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}