// react
import React from "react";
import CustomDialog from "../components/CustomDialog";

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

export default class CustomTable extends React.Component {
    state = {
        isEditing: false,
        temp: {},
        isValidated: true,
        showModal: false,
        confirmation: false
    }

    handleEdit = element => {
        this.setState(state => ({
            isEditing: !state.isEditing,
            temp: element,
            isValidated: true
        }))
    }

    handleChange = e => {
        let { title, description } = this.state.temp;
        let { isValidated } = this.state;

        if (e.target.name === 'title') {
            title = e.target.value
        } else {
            description = e.target.value
        }

        if (title.length > 2) {
            isValidated = true;
        } else {
            isValidated = false;
        }

        this.setState(prevState => ({
            isValidated: isValidated,
            temp: {
                ...prevState.temp,
                title,
                description
            }
        }))
    }

    handleUpdate = () => {
        if (this.state.isValidated && this.state.temp.title.length > 2) {
            this.props.handleUpdate(this.state.temp)
            this.setState({
                isEditing: false,
                temp: {}
            })
        }
    }

    handleCancel = () => {
        this.setState({
            showModal: false
        })
    }

    handleConfirmation = el => {
        this.setState({
            showModal: true,
            temp: el
        })
    }

    handleRemove = () => {
        this.props.handleRemove(this.state.temp)
        this.setState({
            showModal: false,
        })
    }

    render() {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {this.props.columns.map((el, index) => {
                                return (
                                    <TableCell key={index + 1}>{el}</TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.list.sort((a, b) => a.title.localeCompare(b.title)).map((el, index) => {
                            return (
                                <TableRow key={index + 1}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{this.state.isEditing && el._id === this.state.temp._id ?
                                        <TextField
                                            label={this.props.translations.project_input_title}
                                            variant="outlined"
                                            name="title"
                                            helperText={!this.state.isValidated ? "Incorrect entry." : ""}
                                            error={!this.state.isValidated}
                                            onChange={e => this.handleChange(e)} value={this.state.temp.title} /> : el.title}
                                    </TableCell>
                                    <TableCell>{this.state.isEditing && el._id === this.state.temp._id ?
                                        <TextField
                                            label={this.props.translations.project_input_description}
                                            variant="outlined"
                                            name="description"
                                            onChange={e => this.handleChange(e)}
                                            value={this.state.temp.description} /> : el.description}</TableCell>
                                    <TableCell>
                                        {this.state.isEditing && el._id === this.state.temp._id &&
                                        <Button variant="outlined" onClick={() => this.handleEdit(el)}>
                                            {this.props.translations.dialog_cancel}
                                        </Button>}
                                        {this.state.isEditing && el._id === this.state.temp._id &&
                                        <Button variant="contained" color="secondary" onClick={() => this.handleUpdate()}>
                                            {this.props.translations.project_list_update_label}
                                        </Button>
                                        }
                                        {!this.state.isEditing &&
                                        <Button variant="contained" color="secondary" onClick={() => this.handleEdit(el)}>
                                            {this.props.translations.project_list_edit_label}
                                        </Button>}
                                        {!this.state.isEditing &&
                                        <Button variant="outlined" color="secondary" onClick={() => this.handleConfirmation(el)}>
                                            {this.props.translations.project_list_remove_label}
                                        </Button>
                                        }
                                    </TableCell>
                                    <CustomDialog
                                        open={this.state.showModal}
                                        handleClose={this.handleRemove}
                                        cancelOption={true}
                                        handleCancel={this.handleCancel}
                                        translations={this.props.translations}
                                        title={this.props.translations.project_dialog_title}
                                        description={this.props.translations.project_dialog_subtitle}
                                    />
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}