import React from 'react'

class SignInForm extends React.Component {

    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            token: ""
        }
    }

    render() {
        return (
        <div>
            <h2>Sign in</h2>          
        </div>)
    }
}

export default SignInForm