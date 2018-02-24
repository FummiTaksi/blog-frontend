import React from 'react'
import SignInForm from './signin/SignInForm'
import SignedUserInfo from './signin/SignedUserInfo'
import BlogList from './list/BlogList'
import BlogForm from './blog/BlogForm'
import Notification from './notification/Notification'
import Togglable from './togglable/Togglable'

import { connect } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'
import {login, logout, init} from '../reducers/loginReducer'

class BlogApp extends React.Component {
    
    componentDidMount() {
        this.props.init()
    }

    logOut() {

        this.props.logout()
        console.log("LOGOUT!!!")
        this.props.notificationChange("Thank you come again", 5)
    }
 

    viewForSignedInUser =  () => {
        return (
            <div>
                <Notification/>
                <SignedUserInfo 
                    currentUser = {this.props.credentials.name}
                    logOutFunction = {() => this.logOut()}
                 />   
                 <Togglable buttonLabel= "create new blog">
                   <BlogForm/>
                 </Togglable>              
                <BlogList/>
            </div>
        )
    }

    viewForNotSignedInUser = () => {
        return (
            <div className = "notSignedIn">
              <Notification/>
              <SignInForm/> 
            </div>
        )
    }
    
    render() {
        const username = this.props.credentials.username
        return (
            <div className = "blogApp">
                {username  && this.viewForSignedInUser()}
                {!username && this.viewForNotSignedInUser()}
            </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        credentials: state.login
    }
}

const mapDispatchToProps = {
    notificationChange,
    login,
    logout,
    init
}

const ConnectedBlogApp = connect(
    mapStateToProps,
    mapDispatchToProps
  )(BlogApp)
export default ConnectedBlogApp