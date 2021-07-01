import React from "react";
import { connect } from "react-redux";
import {sendTimesheetEffect} from '../redux/effects';

// material-ui
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from "@material-ui/core/Button";

class TimeSheetInputForm extends React.Component {
    state = {
        _id: '',
        data: {
            hours: '',
            minutes: '',
            pages: '',
            selectedDate: ''
        }
    }

    componentDidMount() {
        const date_create = new Date();
        this.setState({
            data: {
                selectedDate: date_create
            }
        })
    }

    handleSelect = e => {
        this.setState({
            _id: e.target.value
        })
    }

    handleDateChange = date => {
        this.setState(state =>{
            return {
                ...state,
                data: {
                    ...state.data,
                    selectedDate: date
                }
            }

        })
    }

    handleChange = e => {
        let {hours, minutes, pages, selectedDate } = this.state.data;

        if (e.target.name === 'hours') {
            hours = e.target.value
        } else if (e.target.name === 'minutes') {
            minutes = e.target.value
        } else {
            pages = e.target.value
        }

        this.setState({
            data: {
                hours,
                minutes,
                pages,
                selectedDate
            }
        })
    }

    handleSubmit = () => {
        const timesheet = this.state;
        this.props.submitTimesheet(timesheet)
        console.log(timesheet)
    }

    render() {
        return (
                <FormControl variant="outlined" id="timesheet-input-group">
                    <InputLabel id="demo-simple-select-outlined-label">Project</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state._id}
                        onChange={e => this.handleSelect(e)}
                        label="Project"
                    >
                        {this.props.projects && this.props.projects.map(project => {
                            return (
                                <MenuItem value={project._id} key={project._id}>{project.title}</MenuItem>
                            )
                        })}
                    </Select>
                    <TextField label="Hours" name="hours" value={this.state.hours} onChange={e => this.handleChange(e)} variant="outlined" type="number" />
                    <TextField label="Minutes" name="minutes" value={this.state.minutes} onChange={e => this.handleChange(e)} variant="outlined" type="number" />
                    <TextField label="Pages" name="pages" value={this.state.pages} onChange={e => this.handleChange(e)} variant="outlined" type="number" />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy/MM/dd"
                                margin="normal"
                                label="Choose date"
                                value={this.state.data.selectedDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Button variant="contained" color="primary" onClick={() => this.handleSubmit()}>
                        Save
                    </Button>
                </FormControl>

        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projectsList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitTimesheet: project => dispatch(sendTimesheetEffect(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheetInputForm)