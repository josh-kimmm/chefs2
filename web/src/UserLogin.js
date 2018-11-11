import React, { Component } from 'react';

class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loginMessage: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateForm = this.updateForm.bind(this);
    }

    handleSubmit(event) {
        fetch("http://localhost:1337/login", {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        }).then(res => res.json()).then(res => {
            if (res.errorMessage) {
                //alert(res.errorMessage);
            }
            this.props.history.push('/test');
        });
    }

    updateForm(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const loginErrorMessage = this.state.loginMessage;

        return (
            <form onSubmit={this.handleSubmit}>
                <input name="email" placeholder="email" onChange={this.updateForm}/>
                <input name="password" type="password" placeholder="password" onChange={this.updateForm}/>
                <button>Login</button>
                <p color='red'>{loginErrorMessage}</p>
            </form>
        );
    }
}

export default UserLogin;
