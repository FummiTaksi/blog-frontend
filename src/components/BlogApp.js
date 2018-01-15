import React from 'react'
import SignInForm from './signin/SignInForm'
import SignedUserInfo from './signin/SignedUserInfo'
import BlogList from './list/BlogList'
import BlogForm from './blog/BlogForm'
import Notification from './notification/Notification'
import loginService from '../services/loginService'

class BlogApp extends React.Component {
    
    constructor() {
        super()
        this.state = {
            user: "",
            currentUser: "",
            signInMessage: ""
        }
    }

    updateUser = (userInfo) => {
        window.localStorage.setItem('loggedUser', JSON.stringify(userInfo))
        this.setState({
            user: userInfo.token,
            currentUser: userInfo.name
        })
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
      }

      alterNotification = (message) => {
          console.log("alterNotification: ",message)
        this.setState({
          signInMessage: message
        })
        setTimeout(() => {
          this.setState({signInMessage: null})
        }, 5000)
      }

    viewForSignedInUser =  () => {
        return (
            <div>
                <Notification message = {this.state.signInMessage}/>
                <SignedUserInfo 
                    currentUser = {this.state.currentUser}
                    logOutFunction = {this.logOut}
                 />   
                <BlogForm />
                <BlogList />
            </div>
        )
    }

    viewForNotSignedInUser = () => {
        return (
            <div>
              <Notification message = {this.state.signInMessage} />
              <SignInForm
                updateUser = {this.updateUser}
                loginFail = {this.alterNotification}
               /> 
            </div>
        )
    }
    
    render() {

        return (
            <div>
                {this.state.user.length > 0 && this.viewForSignedInUser()}
                {this.state.user.length === 0 && this.viewForNotSignedInUser()}
            </div>

        )
        
    }
}

export default BlogApp