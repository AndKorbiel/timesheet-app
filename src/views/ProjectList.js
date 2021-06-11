import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";

export default function ProjectsList() {
    return (
        <Container fixed id="main">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper>
                        <h1>Projects list</h1>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}