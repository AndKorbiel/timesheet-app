import { connect } from "react-redux";
import CustomTable from "../components/CustomTable";
import ProjectInputForm from "../components/ProjectInputForm";
import React, {useEffect, useState} from "react";
import {updateProjectEffect, removeProjectEffect, addNewProjectEffect, getAllProjectsEffect} from '../redux/effects';

// Material UI
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function ProjectsList(props) {
    useEffect(()=> {
        props.getData()
    }, [])

    const [editing, setEdit] = useState(false);
    const [temp, setTemp] = useState({})

    const handleEdit = element => {
        setEdit(!editing)
        setTemp(element)
    }

    return (
        <Container fixed id="main">
            {props.isLoggedIn &&
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className="app-main">
                            <h1>{props.translations.projects_list_title}</h1>
                            <ProjectInputForm onSubmit={props.addNewProject}
                                              titleLabel={props.translations.project_input_title}
                                              descriptionLabel={props.translations.project_input_description}
                                              addLabel={props.translations.project_input_add}
                                              errorLabel={props.translations.project_input_error}
                            />
                            {props.projectsList &&
                            <CustomTable
                                columns={props.translations.projects_list_table_headers}
                                list={props.projectsList}
                                handleRemove={props.removeProject}
                                handleEdit={handleEdit}
                                handleUpdate={props.updateProject}
                                editing={editing}
                                temp={temp}
                                translations={props.translations}
                            />
                            }
                        </Paper>
                    </Grid>
                </Grid>
            }
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        projectsList: state.projectsList,
        translations: state.translations[state.selectedLanguage],
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getData: () => dispatch(getAllProjectsEffect()),
        addNewProject: project => dispatch(addNewProjectEffect(project)),
        removeProject: project => dispatch(removeProjectEffect(project)),
        updateProject: project => dispatch(updateProjectEffect(project)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList)