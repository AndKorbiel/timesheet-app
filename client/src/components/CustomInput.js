import React from 'react';
import { connect } from "react-redux";
import {addNewProjectEffect} from "../redux/effects";
import CustomInputDisplay from "./CustomInputDisplay";
import Button from "@material-ui/core/Button";

class CustomInput extends React.Component {
    state = {
        isValidated: true
    }

    handleChange = e => {
        setTimeout(() => {
            this.setState({
                [e.target.name]: {name: e.target.name, value: e.target.value}
            })
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