import React from 'react';
import { connect } from "react-redux";
import {addNewProjectEffect} from "../redux/effects";
import CustomInputDisplay from "./CustomInputDisplay";
import Button from "@material-ui/core/Button";

class CustomInput extends React.Component {
    state = {
        isValidated: true,
        temp: {}
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.editing !== this.props.editing && this.props.editing) {
            setTimeout(() => {
                this.setState({
                    temp: {
                        title: {name: 'title', value: this.props.temp.title},
                        description: {name: 'description', value: this.props.temp.description},
                    }
                })
            }, 200)
        } else if (prevProps.editing !== this.props.editing && !this.props.editing) {
            this.setState({
                temp: {}
            })
        }
    }

    handleChange = e => {
        let val = {}
        if (this.props.editing) {
            val = {
                temp: {
                    [e.target.name]: {name: e.target.name, value: e.target.value}
                },
                [e.target.name]: {name: e.target.name, value: e.target.value}
            }
        } else {
            val = {
                [e.target.name]: {name: e.target.name, value: e.target.value}
            }
        }
            setTimeout(() => {
                this.setState(val)
                this.validateRequired()
            }, 200)
    }

    validateRequired = () => {
        let val = false;
        if (this.state.hasOwnProperty(this.props.validation)) {
            if (this.state[this.props.validation].value.length > 2) {
                val = true;
            }
        }
        this.setState({
            isValidated: val
        })

        return val
    }

    handleSubmit = () => {
       if (this.validateRequired()) {
           const output = {}
           this.props.inputs.forEach(el => {
               output[[el.name]] = this.state[el.name].value
           })
           this.props.addNewProject(output)
       }
    }

    render() {
        return (
            <form autoComplete={"off"}>
                {this.props.inputs.map(el => {
                    return (
                        <CustomInputDisplay
                            input={el}
                            validation={this.state.isValidated}
                            key={el.name}
                            actionOnChange={this.handleChange}
                            value={this.state.temp}
                            isEditing={this.props.editing}
                        />
                    )
                })}
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                    Submit
                </Button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewProject: project => dispatch(addNewProjectEffect(project))
    }
}

export default connect(null, mapDispatchToProps)(CustomInput);