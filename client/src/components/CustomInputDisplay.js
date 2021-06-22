import React from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl'

export default function CustomInputDisplay(props) {
    return (
        <>
            {props.input.type === 'input' &&
            <TextField
                variant={"outlined"}
                helperText={props.input.validation && !props.validation ? "Incorrect entry" : ''}
                error={props.input.validation && !props.validation}
                label={props.input.label}
                name={props.input.name}
                key={props.input.name}
                onChange={(e) => props.actionOnChange(e)}/>
            }
            {props.input.type === 'select' &&
            <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.input.data}
                    onChange={(e) => props.actionOnChange(e)}
                    label="Age"
                    name={props.input.name}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {props.input.data.map(el => {
                        return (
                            <MenuItem value={el.title} key={el.id}>{el.title}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            }
        </>

    )
}