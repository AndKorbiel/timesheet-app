import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React, {useEffect} from "react";
import {getAllProjectsEffect} from "../redux/effects";
import {connect} from "react-redux";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

function Statistics(props) {
    let data = [];
    const columns = ["id", "Name", "Description"];

    useEffect(() => {
        props.getData()
    }, [])

    const formatDate = date => {
        return date.replace(/T.*/g, '');
    }

    const calculateTotalTime = el => {
        let temp = 0;
        let tempMinutes = 0;

        el.forEach(n => {
            if (typeof n.hours !== 'undefined') {
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

    const generateList = list => {
        let myList = {}

        let filters = []
        list.forEach(el => {
            el.timesheets.forEach(timesheet => {
                if (filters.indexOf(formatDate(timesheet.selectedDate)) < 0) {
                    filters.push(formatDate(timesheet.selectedDate))
                }
            })
        })
        list.forEach(el => {
            el.timesheets.forEach(timesheet => {
                filters.forEach(filter => {
                    let arr = []
                    if (formatDate(timesheet.selectedDate) === filter) {
                        console.log('jest')
                        arr.push(el)
                    }
                    myList[filter] = arr;
                })

            })
        })
        console.log(myList)
    }

    return (
        <Container fixed id="main">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className="app-main">
                        <h1>Statistics</h1>
                        <TableContainer component={Paper}>
                            <Table aria-label="timesheets list table">
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
                                {props.projectsList &&
                                    <TableBody>
                                        {generateList(props.projectsList)}
                                    </TableBody>
                                }
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

export default connect(mapStateToProps, mapDispatchToProps)(Statistics)