import { connect } from "react-redux";
import { loginEffect } from '../redux/effects';
import { handleLogin } from '../redux/actions';

// material-ui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import React from "react";

class LoginForm extends React.Component {
    state = {
        name: '',
        pass: '',
    }

    componentDidMount() {
        const isLoggedIn = sessionStorage.getItem("ts-app");
        if (isLoggedIn === 'loggedIn') {
            this.props.handleLogin({isSuccess: true, loginMessage: 'You are logged in'})
        }
    }

    handleChange = e => {
        let { name, pass } = this.state

        if (e.target.name === 'Username') {
            name = e.target.value
        } else {
            pass = e.target.value
        }

        this.setState({
            name,
            pass
        })
    }

    handleSubmit = () => {
        const name = this.state.name;
        const password = this.state.pass
        this.props.login({name, password})
    }

    render() {
        return (
            <Dialog
                open={!this.props.isLoggedIn}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                id="login-form"
            >
                <DialogTitle id="alert-dialog-title">
                    Login
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please login to use application
                    </DialogContentText>
                    <div id="project-input-group">
                        <TextField label="Username" variant="outlined" name="Username" value={this.state.name} onChange={e => this.handleChange(e)} />
                        <TextField label="Password" type="password" variant="outlined" name="Password" value={this.state.pass} onChange={e => this.handleChange(e)} />
                        {this.props.loginMessage &&
                            <p>{this.props.loginMessage}</p>
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleSubmit()} color="primary" variant="outlined">
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        loginMessage: state.loginMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: data => dispatch(loginEffect(data)),
        handleLogin: data => dispatch(handleLogin(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)