import React from "react";
import {connect} from "react-redux";
// material UI
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

function Home(props) {
    const projectsList = props.projectsList ? props.projectsList : [];

    return (
        <Container fixed id="main">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper>
                        <h1>Welcome in timesheet app</h1>
                        <hr />
                        <h2>Please insert your work data:</h2>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        projectsList: state.projectsList
    }
}

export default connect(mapStateToProps, null)(Home)