import React from 'react'
import SignInForm from './signin/SignInForm'
import BlogList from './list/BlogList'
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
            currentUser: userInfo.currentUser
        })
    }
    componentWillMount() {
  
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        console.log("KIRJAUTUNUT KÄYTTÄJÄ: ",loggedUserJSON)
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          this.setState({
              user: user.token,
              currentUser: user.currentUser
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
 
    blogList =  () => {
        return (
            <div>
                <h3>You are logged in as {this.state.currentUser}</h3>
                <button onClick = {this.logOut}>logout</button>
                <BlogList />
            </div>
        )
    }
    
    render() {

        return (
            <div>
                {this.state.user.length > 0 && this.blogList()}
                {this.state.user.length === 0 && <SignInForm updateUser = {this.updateUser} />}
            </div>

        )
        
    }
}

export default BlogApp