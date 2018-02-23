import React from 'react'
import loginService from '../../services/loginService'
import { login } from '../../reducers/loginReducer'
import { connect } from 'react-redux'
import Input from '../input/Input'

class SignInForm extends React.Component {

    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
        }
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    setTokenAndResetFields = (data) => {
        const userInfo = {
            token: data.token,
            name: data.name,
            username: this.state.username,
            password: this.state.password
        }
        this.setState({
            username: "",
            password: ""
        })
        loginService.setToken(userInfo.token)
        this.props.updateUser(userInfo)
    }

    logIn = async (e) => {
        e.preventDefault();
        const credentials = {
            username: this.state.username,
             password: this.state.password
            }
        this.props.login(credentials)
       /* if (response.data) {
            this.setTokenAndResetFields(response.data)
        }
        else {
            this.props.loginFail("Wrong username or password")
        }*/
    }

    render() {
        return (
        <div>
            <h2>Welcome to blog-app!</h2>
            <form onSubmit={this.logIn}>
                <Input
                    text = "Username:" 
                    name = "username"
                    value = {this.state.username}
                    onChange = {this.handleFormChange}
                 />  
                <Input 
                    text = "Password:"
                    name = "password"
                    value = {this.state.password}
                    onChange = {this.handleFormChange}
                 />   
                 <button type="submit">Log in </button>
            </form>          
        </div>
        )
    }
}

const mapDispatchToProps = {
    login
}

const ConnectedSignInForm = connect(
    null,
    mapDispatchToProps
  )(SignInForm)

export default ConnectedSignInForm