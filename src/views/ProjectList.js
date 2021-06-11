import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";

import { connect } from "react-redux";

function ProjectsList(props) {
    return (
        <Container fixed id="main">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper>
                        <h1>Projects list</h1>
                        <ul>
                            {props.projectsList.map(project => {
                                return (
                                    <li>{project}</li>
                                )
                            })}
                        </ul>
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

export default connect(mapStateToProps, null)(ProjectsList)