import { connect } from "react-redux";
import CustomInput from "../components/CustomInput";
import CustomTable from "../components/CustomTable";
import { useEffect } from "react";
import {getAllProjectsEffect, removeProjectEffect} from '../redux/effects';

// Material UI
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function ProjectsList(props) {
    useEffect(()=>{
        props.getData()
    }, [])
    return (
        <Container fixed id="main">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper>
                        <h1>Projects list</h1>
                        <CustomInput
                            inputs={[
                                {label: "Project name", name: 'title', required: true, validation: true, type: 'input'},
                                {label: "Description", name: 'description', required: false, validation: false, type: 'input'}
                            ]}
                            validation="title"
                        />
                        {props.projectsList &&
                            <CustomTable
                                columns={["id", "Name", "Description", "Edit"]}
                                list={props.projectsList}
                                action={props.removeProject}
                            />
                        }
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
        getData: () => dispatch(getAllProjectsEffect()),
        removeProject: project => dispatch(removeProjectEffect(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList)