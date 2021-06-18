import { connect } from "react-redux";
import CustomInput from "../components/CustomInput";
import CustomTable from "../components/CustomTable";
import { useEffect } from "react";
// Material UI
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function ProjectsList(props) {
    useEffect(()=>{
        console.log(props.projectsList)
    })
    return (
        <Container fixed id="main">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper>
                        <h1>Projects list</h1>
                        <CustomInput
                            inputs={[
                                {label: "Project name", name: 'title', required: true, validation: true, type: 'input'},
                                {label: "Description", name: 'desc', required: false, validation: false, type: 'input'}
                            ]}
                            validation="title"
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

export default connect(mapStateToProps, null)(ProjectsList)