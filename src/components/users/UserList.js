import React from 'react'
import { connect } from 'react-redux'
import { userInitialization } from '../../reducers/userReducer'
import { Link } from 'react-router-dom'

class UserList extends React.Component {

    componentDidMount() {
        this.props.userInitialization()
    }

    renderUsers = () => {
        return this.props.users.map(user => {
            return (
                <tr key = {user.id}>
                    <td><Link to = {`/users/${user.id}`}>{user.name}</Link></td>
                    <td>{user.blogs.length}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
              <h1>Listing all users:</h1>
              <table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>Blogs added</th>
                    </tr>
                    {this.renderUsers()}
                  </tbody>
              </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const ConnectedUserList = connect(
    mapStateToProps,
    {userInitialization}
)(UserList)

export default ConnectedUserList