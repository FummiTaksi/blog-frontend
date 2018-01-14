import React from 'react'
import loginService from '../services/loginService'


class SignInForm extends React.Component {

    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            user: ""
        }
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    setTokenAndResetFields = (token) => {
        this.setState({
            username: "",
            password: "",
            user: token
        })
    }

    logIn = async (e) => {
        e.preventDefault();
        const credentials = {
            username: this.state.username,
             password: this.state.password
            }
        const response = await loginService.login(credentials)
        if (response.data) {
            this.setTokenAndResetFields(response.data.token)
        }
    }

    render() {
        return (
        <div>
            <h2>Welcome to blog-app!</h2>
            <form onSubmit={this.logIn}>
                Username:
                <input 
                    name = "username"
                    value = {this.state.username}
                    onChange = {this.handleFormChange}
                 />  
                 <br></br>
                Password:
                <input 
                    name = "password"
                    value = {this.state.password}
                    onChange = {this.handleFormChange}
                 />   
                 <br></br>
                 <button type="submit">Log in </button>
            </form>          
        </div>)
    }
}

export default SignInForm