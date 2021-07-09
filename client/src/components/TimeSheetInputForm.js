import React from "react";
import { connect } from "react-redux";
import {getAllProjectsEffect, sendTimesheetEffect} from '../redux/effects';
import CustomDialog from "./CustomDialog";

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

const date_create = new Date();
const initialState = {
    _id: '',
    data: {
        hours: '',
        minutes: '',
        pages: '',
        selectedDate: date_create
    },
    openModal: false,
    isValidated: true
}

class TimeSheetInputForm extends React.Component {
    state = initialState;

    componentDidMount() {
        this.props.getData();
        const date_create = new Date();
        this.setState({
            data: {
                selectedDate: date_create
            }
        })
    }

    handleSelect = e => {
        this.setState({
            _id: e.target.value,
            isValidated: true
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

    handleClose = () => {
        this.setState({
            openModal: false
        })
    };

    generateHash = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    handleSubmit = () => {
        if (this.state.isValidated && this.state._id.length > 2) {
            const timesheet = this.state;
            timesheet.data.hash = this.generateHash()
            this.props.submitTimesheet(timesheet)
            this.setState({
                openModal: true
            })
            setTimeout(()=>{
                this.setState(initialState)
            }, 1000)
        } else {
            this.setState({
                isValidated: false
            })
        }
    }

    render() {
        return (
                <FormControl variant="outlined" id="timesheet-input-group">
                    <InputLabel id="demo-simple-select-outlined-label">{this.props.translations.timesheets_list_table_projects}</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state._id}
                        error={!this.state.isValidated}
                        onChange={e => this.handleSelect(e)}
                        label={this.props.translations.timesheets_list_table_projects}
                    >
                        {this.props.projects && this.props.projects.sort((a, b) => a.title.localeCompare(b.title)).map(project => {
                            return (
                                <MenuItem value={project._id} key={project._id}>{project.title}</MenuItem>
                            )
                        })}
                    </Select>
                    <TextField label={this.props.translations.timesheets_list_table_hours} name="hours" value={this.state.data.hours} onChange={e => this.handleChange(e)} variant="outlined" type="number" />
                    <TextField label={this.props.translations.timesheets_list_table_minutes} name="minutes" value={this.state.data.minutes} onChange={e => this.handleChange(e)} variant="outlined" type="number" />
                    <TextField label={this.props.translations.timesheets_list_table_pages} name="pages" value={this.state.data.pages} onChange={e => this.handleChange(e)} variant="outlined" type="number" />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy/MM/dd"
                                margin="normal"
                                label={this.props.translations.datepicker_label}
                                value={this.state.data.selectedDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Button variant="contained" color="primary" onClick={() => this.handleSubmit()}>
                        {this.props.translations.timseehts_input_save}
                    </Button>
                    <CustomDialog
                        open={this.state.openModal}
                        handleClose={this.handleClose}
                        cancelOption={false}
                        title={this.props.translations.timesheets_dialog_submitted}
                        description=""
                        translations={this.props.translations}
                    />
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
        submitTimesheet: project => dispatch(sendTimesheetEffect(project)),
        getData: () => dispatch(getAllProjectsEffect())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheetInputForm)