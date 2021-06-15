import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";

import { useState } from "react";
import { connect } from "react-redux";
import CustomInput from "../components/CustomInput";
import {addNewProject} from "../redux/actions";
import CustomTable from "../components/CustomTable";

// I have to extract CustomInput class component for those actions and keep local state there

function ProjectsList(props) {
    const [tempValue, changeTempValue] = useState('');
    const [isValidated, validate] = useState(false)

    const handleChange = e => {
        const value = e.target.value;
        if (value.length > 2) {
            validate(false)
            changeTempValue(e.target.value)
        } else {
            validate(true)
        }
    }

    const handleSubmit = () => {
        if (!isValidated) {
            props.addNewProject(tempValue)
        } else {
            validate(true)
        }
    }

    return (
        <Container fixed id="main">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper>
                        <h1>Projects list</h1>
                        <CustomInput
                            inputs={[
                                {name: "Project name", required: true, validation: isValidated},
                                {name: "Description", required: false}
                                ]}
                            actionOnSubmit={handleSubmit}
                            actionOnChange={handleChange}
                        />
                        <CustomTable columns={["id", "Name", "Description"]} list={props.projectsList} />
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

const mapDispatchToProps = dispatch => {
    return {
        addNewProject: project => dispatch(addNewProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList)