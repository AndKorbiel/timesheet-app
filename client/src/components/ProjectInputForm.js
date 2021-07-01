import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default class ProjectInputForm extends React.Component {
    state = {
        title: '',
        description: '',
        isValidated: true
    }

    handleChange = e => {
        let { title, description, isValidated } = this.state

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

        this.setState({
            title,
            description,
            isValidated
        })
    }

    handleSubmit = () => {
        if (this.state.isValidated && this.state.title.length > 2) {
            this.props.onSubmit(this.state)
        } else {
            this.setState({
                isValidated: false
            })
        }
    }

    render() {
        return (
            <div id="project-input-group">
                <TextField label="Title" variant="outlined" name="title" helperText={!this.state.isValidated ? "Incorrect entry." : ""} error={!this.state.isValidated} value={this.state.title} onChange={e => this.handleChange(e)} />
                <TextField label="Description" variant="outlined" name="description" value={this.state.description} onChange={e => this.handleChange(e)} />
                <Button variant="contained" onClick={this.handleSubmit} color="primary" >Add</Button>
            </div>
        )
    }
}