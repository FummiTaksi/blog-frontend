import React from 'react'
import SignInForm from './signin/SignInForm'
import SignedUserInfo from './signin/SignedUserInfo'
import BlogList from './list/BlogList'
import BlogForm from './blog/BlogForm'
import Notification from './notification/Notification'
import loginService from '../services/loginService'
import Togglable from './togglable/Togglable'

import { connect } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'

class BlogApp extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            user: "",
            currentUser: "",
            notification: ""
        }
    }

    updateUser = (userInfo) => {
        window.localStorage.setItem('loggedUser', JSON.stringify(userInfo))
        this.setState({
            user: userInfo.token,
            currentUser: userInfo.name
        })
        loginService.setCurrentUser(userInfo)
        this.alterNotification("Welcome back!")
    }
    componentWillMount() {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          this.setState({
              user: user.token,
              currentUser: user.name
            })
          loginService.setToken(user.token)
          loginService.setCurrentUser(user)
        }
        else {
            this.logOut()
        }
      }

      logOut = () => {
          this.setState({
              user:"",
              currentUser:""
          })
          window.localStorage.removeItem("loggedUser")
          loginService.setToken("")
          loginService.setCurrentUser(undefined)
      }

      alterNotification = async (message) => {
        console.log("ALTER NOTIFICATION")
        this.props.notificationChange(message)
        setTimeout(() => {
          this.props.notificationChange("")
        },5000)
      }

    viewForSignedInUser =  () => {
        return (
            <div>
                <Notification message = {this.state.notification}/>
                <SignedUserInfo 
                    currentUser = {this.state.currentUser}
                    logOutFunction = {this.logOut}
                 />   
                 <Togglable buttonLabel= "create new blog">
                   <BlogForm  alterNotification = {this.alterNotification}/>
                 </Togglable>              
                <BlogList alterNotification = {this.alterNotification} />
            </div>
        )
    }

    viewForNotSignedInUser = () => {
        return (
            <div className = "notSignedIn">
              <Notification message = {this.state.notification} />
              <SignInForm
                updateUser = {this.updateUser}
                loginFail = {this.alterNotification}
               /> 
            </div>
        )
    }
    
    render() {

        return (
            <div className = "blogApp">
                {this.state.user.length > 0 && this.viewForSignedInUser()}
                {this.state.user.length === 0 && this.viewForNotSignedInUser()}
            </div>
        )
        
    }
}

const mapDispatchToProps = {
    notificationChange
}

const ConnectedBlogApp = connect(
    null,
    mapDispatchToProps
  )(BlogApp)
export default ConnectedBlogApp