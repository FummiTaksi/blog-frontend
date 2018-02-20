import React from 'react'
import SignInForm from './signin/SignInForm'
import SignedUserInfo from './signin/SignedUserInfo'
import BlogList from './list/BlogList'
import BlogForm from './blog/BlogForm'
import Notification from './notification/Notification'
import loginService from '../services/loginService'
import Togglable from './togglable/Togglable';

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

      alterNotification = (message) => {
        this.props.store.dispatch({type: 'CHANGE_NOTIFICATION', message})
        this.setState({
            notification: this.props.store.getState()
          })
          setTimeout(() => {
            this.setState({notification: null})
          }, 5000)
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

export default BlogApp