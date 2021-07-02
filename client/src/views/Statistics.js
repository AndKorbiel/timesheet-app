import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React, {useEffect, useState} from "react";
import {getAllProjectsEffect} from "../redux/effects";
import {connect} from "react-redux";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

class Statistics extends React.Component {
    state = {}
    columns = ["id", "Name", "Description"];

    componentDidMount() {
        this.props.getData()
        const check = setInterval(()=> {
            if (this.props.projectsList) {
                const state = this.generateList(this.props.projectsList)
                this.setState(state)
                clearInterval(check)
            }
        }, 50)

    }

    formatDate = date => {
        return date.replace(/T.*/g, '');
    }

    calculateTotalTime = el => {
        let temp = 0;
        let tempMinutes = 0;

        el.forEach(n => {
            if (typeof n.timesheet.hours !== 'undefined') {
                temp = temp + parseInt(n.timesheet.hours)
            }
            if (typeof n.timesheet.minutes !== 'undefined') {
                tempMinutes = tempMinutes + parseInt(n.timesheet.minutes)
            }
        })
        return (temp + tempMinutes / 60).toFixed(2) + ' hours'
    }

    calculateTotal = (el, type) => {
        let temp = 0;

        el.forEach(n => {
            if (typeof n.timesheet[type] !== "undefined") {
                temp = temp + parseFloat(n.timesheet[type])
            }
        })
        return temp.toFixed(1)
    }

    generateList = list => {
        let tsList = {}

        let filters = []
        list.forEach(el => {
            el.timesheets.forEach(timesheet => {
                if (filters.indexOf(this.formatDate(timesheet.selectedDate)) < 0 && this.formatDate(timesheet.selectedDate).length > 1) {
                    filters.push(this.formatDate(timesheet.selectedDate))
                }
            })
        })
        filters.forEach(filter => {
            let temp = [];
            list.forEach(listEl => {
                listEl.timesheets.forEach(timesheet => {
                    if (this.formatDate(timesheet.selectedDate) === filter) {
                        temp.push({project: listEl, timesheet: timesheet})
                    }
                    tsList[filter] = temp;
                })
            })
        })
        const state = {filters: filters, tsList: tsList};
        return state
    }

    render() {
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
                                            {this.columns.map((el, index) => {
                                                return (
                                                    <TableCell key={index + 1}>{el}</TableCell>
                                                )
                                            })}
                                            <TableCell colSpan={3}>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.filters && this.state.filters.map(filter => {
                                            return (
                                                <>
                                                    <TableRow>
                                                        <TableCell colSpan={5}>
                                                            {filter}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell></TableCell>
                                                        <TableCell>Project name</TableCell>
                                                        <TableCell>Hours</TableCell>
                                                        <TableCell>Minutes</TableCell>
                                                        <TableCell>Pages</TableCell>
                                                    </TableRow>
                                                    {this.state.tsList[filter].map(timesheet => {
                                                        return (
                                                            <TableRow>
                                                                <TableCell></TableCell>
                                                                <TableCell>
                                                                    {timesheet.project.title}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {timesheet.timesheet.hours}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {timesheet.timesheet.minutes}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {timesheet.timesheet.pages}
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })}
                                                    <TableRow className="subtotal">
                                                        <TableCell></TableCell>
                                                        <TableCell>Total</TableCell>
                                                        <TableCell colSpan={2}>
                                                            {this.calculateTotalTime(this.state.tsList[filter])}
                                                        </TableCell>
                                                        <TableCell colSpan={2}>
                                                            {this.calculateTotal(this.state.tsList[filter], 'pages')} pages
                                                        </TableCell>
                                                    </TableRow>
                                                </>
                                            )
                                        })}
                                    </TableBody>

                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        )
    }
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