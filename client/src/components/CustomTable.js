// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";

// react
import React from "react";
import TextField from "@material-ui/core/TextField";

export default class CustomTable extends React.Component {
    state = {
        isEditing: false,
        temp: {}
    }

    handleEdit = element => {
        this.setState(state => ({
            isEditing: !state.isEditing,
            temp: element
        }))
    }

    handleChange = e => {
        let { title, description } = this.state.temp

        if (e.target.name === 'title') {
            title = e.target.value
        } else {
            description = e.target.value
        }

        this.setState(prevState => ({
            temp: {
                ...prevState.temp,
                title,
                description
            }
        }))
    }

    handleUpdate = () => {
        this.props.handleUpdate(this.state.temp)
        this.setState({
            isEditing: false,
            temp: {}
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
                        {this.props.list.map((el, index) => {
                            return (
                                <TableRow key={index + 1}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{this.state.isEditing && el._id === this.state.temp._id ?
                                        <TextField label="Outlined" variant="outlined" name="title" onChange={e => this.handleChange(e)} value={this.state.temp.title} /> : el.title}</TableCell>
                                    <TableCell>{this.state.isEditing && el._id === this.state.temp._id ?
                                        <TextField label="Outlined" variant="outlined" name="description" onChange={e => this.handleChange(e)} value={this.state.temp.description} /> : el.description}</TableCell>
                                    <TableCell>
                                        {this.state.isEditing && el._id === this.state.temp._id &&
                                        <Button variant="contained" onClick={() => this.handleEdit(el)}>
                                            Cancel
                                        </Button>}
                                        {this.state.isEditing && el._id === this.state.temp._id &&
                                        <Button variant="contained" color="secondary" onClick={() => this.handleUpdate()}>
                                            Update
                                        </Button>
                                        }
                                        {!this.state.isEditing &&
                                        <Button variant="contained" onClick={() => this.handleEdit(el)}>
                                            Edit
                                        </Button>}
                                        {!this.state.isEditing &&
                                        <Button variant="contained" color="secondary" onClick={() => this.props.handleRemove(el)}>
                                            Remove
                                        </Button>
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}