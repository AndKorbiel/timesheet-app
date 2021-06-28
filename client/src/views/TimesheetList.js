import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import React, { useEffect } from "react";

import TimeSheetInputForm from '../components/TimeSheetInputForm';
import {getAllProjectsEffect} from "../redux/effects";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import { format, formatDistance, formatRelative, subDays } from 'date-fns'


function TimeSheetList(props) {
    useEffect(()=> {
        props.getData()
        console.log(props.projectsList)
    }, [])
    const columns = ["id", "Name", "Description"];

    const formatDate = date => {

        return date.replace(/T.*/g, '');
    }

    return (
        <Container fixed id="main">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper>
                        <h1>Timesheets list</h1>
                        <TimeSheetInputForm />
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((el, index) => {
                                            return (
                                                <TableCell key={index + 1}>{el}</TableCell>
                                            )
                                        })}
                                        <TableCell colSpan={3}>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.projectsList && props.projectsList.map((project, index) => {
                                        return (
                                            <>
                                                <TableRow key={index + 1}>
                                                    <TableCell component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        {project.title}
                                                    </TableCell>
                                                    <TableCell colSpan={3}>
                                                        {project.description}
                                                    </TableCell>
                                                </TableRow>
                                                {project.timesheets.length > 0 &&
                                                <TableRow className="inner-header">
                                                    <TableCell></TableCell>
                                                    <TableCell>id</TableCell>
                                                    <TableCell>hours</TableCell>
                                                    <TableCell>minutes</TableCell>
                                                    <TableCell>pages</TableCell>
                                                    <TableCell>date</TableCell>
                                                </TableRow>
                                                }
                                                {project.timesheets.map((timesheet, j) => {
                                                    return (
                                                        <TableRow key={j + 1}>
                                                            <TableCell></TableCell>
                                                            <TableCell component="th" scope="row">
                                                                {j + 1}
                                                            </TableCell>
                                                            <TableCell>
                                                                {timesheet.hours}
                                                            </TableCell>
                                                            <TableCell>
                                                                {timesheet.minutes}
                                                            </TableCell>
                                                            <TableCell>
                                                                {timesheet.pages}
                                                            </TableCell>
                                                            <TableCell>
                                                                {formatDate(timesheet.selectedDate)}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </>
                                        )
                                    }
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
        getData: () => dispatch(getAllProjectsEffect())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheetList)