import React from 'react'
import SignInForm from './signin/SignInForm'
import SignedUserInfo from './signin/SignedUserInfo'
import BlogList from './list/BlogList'
import BlogForm from './blog/BlogForm'
import Notification from './notification/Notification'
import Togglable from './togglable/Togglable'
import UserList from './users/UserList'

import { connect } from 'react-redux'
import {login, logout, init} from '../reducers/loginReducer'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class BlogApp extends React.Component {
    
    componentDidMount() {
        this.props.init()
    }

    BlogPage = () => {
        return (
            <div>
                <Notification/>
                <SignedUserInfo 
                    currentUser = {this.props.credentials.name}
                    logOutFunction = {() => this.props.logout()}
                 />   
                 <Togglable buttonLabel= "create new blog">
                   <BlogForm/>
                 </Togglable>              
                <BlogList/>
            </div>
        )
    }

    viewForSignedInUser = () => {
        return (
            <div>
              <Router>
                <div>
                  <div>
                    <Link to="/">home</Link> &nbsp;
                    <Link to="/users">users</Link>
                  </div>
                  <Route exact path="/" render={() => this.BlogPage()} />
                  <Route path="/users" render={() => <UserList />} />
                </div>
              </Router>
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
    login,
    logout,
    init
}

const ConnectedBlogApp = connect(
    mapStateToProps,
    mapDispatchToProps
  )(BlogApp)
export default ConnectedBlogApp