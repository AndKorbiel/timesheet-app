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
        return (temp + tempMinutes / 60).toFixed(2)
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
        let tsList = {};
        let filters = [];
        let years = [];
        let months = [];
        let sorted = {}
        let filtered = {}

        list.forEach(el => {
            el.timesheets.forEach(timesheet => {
                if (filters.indexOf(this.formatDate(timesheet.selectedDate)) < 0 && this.formatDate(timesheet.selectedDate).length > 1) {
                    filters.push(this.formatDate(timesheet.selectedDate))
                }
            })
        })

        filters.forEach(filter => {
            if (years.indexOf(filter.substring(0,4)) < 0) {
                years.push(filter.substring(0,4))
            }
            if (months.indexOf(filter.substring(5,7)) < 0) {
                months.push(filter.substring(5,7))
            }
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

        let sortedbyYears = {}
        let sortedByMonths = {}

        months.forEach(month => {
            let temp = []
            for (let [key, value] of Object.entries(tsList)) {
                value.forEach(entry => {
                    if (key.substring(5,7) === month) {
                        temp.push(entry)
                    }
                })

            }
            sortedByMonths[month] = temp
        })

        years.forEach(year => {
            let temp = []
            for (let [key, value] of Object.entries(sortedByMonths)) {
                value.forEach(timesheet => {
                    if (timesheet.timesheet.selectedDate.substring(0,4) === year) {
                        temp.push(timesheet)
                    }
                })

            }
            sortedbyYears[year] = temp
        })

        years.forEach(year => {
            sorted[year] = sortedByMonths
        })

        for (let [key, value] of Object.entries(sorted)) {
            let temp = {}
            for (let [innerKey, innerValue] of Object.entries(value)) {
                temp[innerKey] = innerValue.filter(el => {
                    return el.timesheet.selectedDate.substring(0,4) === key
                })
            }
            filtered[key] = temp
        }

        for (let [key, value] of Object.entries(filtered)) {
            for (let [innerKey, innerValue] of Object.entries(value)) {
                if (innerValue.length === 0) {
                    delete filtered[key][innerKey]
                }
            }
        }
        console.log(filtered)
        console.log(tsList)
        const state = {filters: filters, tsList: tsList};


        return state
    }

    render() {
        return (
            <Container fixed id="main">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className="app-main">
                            <h1>{this.props.translations.timesheets_list_title}</h1>
                            <TableContainer component={Paper}>
                                <Table aria-label="timesheets list table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                {this.props.translations.statistics_table_header}
                                            </TableCell>
                                            <TableCell colSpan={4}>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.filters && this.state.filters.map(filter => {
                                            return (
                                                <>
                                                    <TableRow className="title-row">
                                                        <TableCell colSpan={5}>
                                                            {filter}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow className="inner-header">
                                                        <TableCell></TableCell>
                                                        <TableCell>{this.props.translations.timesheets_list_table_project_name_label}</TableCell>
                                                        <TableCell>{this.props.translations.timesheets_list_table_hours}</TableCell>
                                                        <TableCell>{this.props.translations.timesheets_list_table_minutes}</TableCell>
                                                        <TableCell>{this.props.translations.timesheets_list_table_pages}</TableCell>
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
                                                        <TableCell>{this.props.translations.timesheets_list_table_name}</TableCell>
                                                        <TableCell colSpan={2}>
                                                            {this.calculateTotalTime(this.state.tsList[filter])} {this.props.translations.timesheets_list_table_hours}
                                                        </TableCell>
                                                        <TableCell colSpan={2}>
                                                            {this.calculateTotal(this.state.tsList[filter], 'pages')} {this.props.translations.timesheets_list_table_pages}
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
        projectsList: state.projectsList,
        translations: state.translations[state.selectedLanguage]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getData: () => dispatch(getAllProjectsEffect())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics)