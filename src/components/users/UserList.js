import React from 'react'
import { connect } from 'react-redux'
import { userInitialization } from '../../reducers/userReducer'

class UserList extends React.Component {

    componentDidMount() {
        this.props.userInitialization()
    }

    renderUsers = () => {
        return this.props.users.map(user => {
            return (
                <div key = {user.id}>
                    <td>{user.name}</td>
                    <td>{user.blogs.length}</td>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
              <h1>Listing all users:</h1>
              <table>
                  <tr>
                      <th>Name</th>
                      <th>Blogs added</th>
                  </tr>
                  {this.renderUsers()}


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