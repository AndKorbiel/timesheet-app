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

function TimeSheetList(props) {
    useEffect(()=> {
        props.getData()
    }, [])
    const columns = ["id", "Name", "Description"];

    const formatDate = date => {
        return date.replace(/T.*/g, '');
    }

    const calculateTotalTime = el => {
        let temp = 0;
        let tempMinutes = 0;

        el.forEach(n => {
            if (typeof n.hours!== 'undefined') {
                temp = temp + parseInt(n.hours)
            }
            if (typeof n.minutes !== 'undefined') {
                tempMinutes = tempMinutes + parseInt(n.minutes)
            }
        })
        return (temp + tempMinutes / 60).toFixed(2) + ' hours'
    }

    const calculateTotal = (el, type) => {
        let temp = 0;

        el.forEach(n => {
            if (typeof n[type] !== "undefined") {
                temp = temp + parseFloat(n[type])
            }
        })
        return temp.toFixed(1)

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
                                                <TableRow className="subtotal">
                                                    <TableCell>Total</TableCell>
                                                    <TableCell colSpan={2}>
                                                        {calculateTotalTime(project.timesheets)}
                                                    </TableCell>
                                                    <TableCell colSpan={2}>
                                                        {calculateTotal(project.timesheets, 'pages')} pages
                                                    </TableCell>
                                                </TableRow>
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