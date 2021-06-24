// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import React from "react";

export default function CustomTable(props) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {props.columns.map((el, index) => {
                            return (
                                <TableCell key={index + 1}>{el}</TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.list.map((el, index) => {
                        return (
                            <TableRow key={index + 1}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{el.title}</TableCell>
                                <TableCell>{el.description}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => props.handleEdit(el)}>
                                        {props.editing ? 'Cancel' : 'Edit'}
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => props.handleRemove(el)}>
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}