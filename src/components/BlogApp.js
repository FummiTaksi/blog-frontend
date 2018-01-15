import React from 'react'
import SignInForm from './signin/SignInForm'
import SignedUserInfo from './signin/SignedUserInfo'
import BlogList from './list/BlogList'
import BlogForm from './blog/BlogForm'
import loginService from '../services/loginService'

class BlogApp extends React.Component {
    
    constructor() {
        super()
        this.state = {
            user: "",
            currentUser: ""
        }
    }

    updateUser = (userInfo) => {
        window.localStorage.setItem('loggedUser', JSON.stringify(userInfo))
        this.setState({
            user: userInfo.token,
            currentUser: userInfo.name
        })
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
 
    viewForSignedInUser =  () => {
        return (
            <div>
                <SignedUserInfo 
                    currentUser = {this.state.currentUser}
                    logOutFunction = {this.logOut}
                 />   
                <BlogForm />
                <BlogList />
            </div>
        )
    }
    
    render() {

        return (
            <div>
                {this.state.user.length > 0 && this.viewForSignedInUser()}
                {this.state.user.length === 0 && <SignInForm updateUser = {this.updateUser} />}
            </div>

        )
        
    }
}

export default BlogApp