import { connect } from "react-redux";
import CustomTable from "../components/CustomTable";
import { useEffect, useState } from "react";
import {updateProjectEffect, getAllProjectsEffect, removeProjectEffect} from '../redux/effects';

// Material UI
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function ProjectsList(props) {
    useEffect(()=>{
        props.getData()
    }, []);

    const [editing, setEdit] = useState(false);
    const [temp, setTemp] = useState({})

    const handleEdit = element => {
        console.log(element)
        setEdit(!editing)
        setTemp(element)
    }

    return (
        <Container fixed id="main">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper>
                        <h1>Projects list</h1>
                        {props.projectsList &&
                            <CustomTable
                                columns={["id", "Name", "Description", "Edit"]}
                                list={props.projectsList}
                                handleRemove={props.removeProject}
                                handleEdit={handleEdit}
                                handleUpdate={props.updateProject}
                                editing={editing}
                                temp={temp}
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
        removeProject: project => dispatch(removeProjectEffect(project)),
        updateProject: project => dispatch(updateProjectEffect(project)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList)