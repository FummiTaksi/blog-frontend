import React from 'react'

class SignedUserInfo extends React.Component {

    render() {
        return (
            <div>
                <h3>You are logged in as {this.props.currentUser}</h3>
                <button onClick = {this.props.logOutFunction}>logout</button>
            </div>
        )
    }
}

export default SignedUserInfo