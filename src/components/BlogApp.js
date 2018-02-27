import React from 'react'
import SignInForm from './signin/SignInForm'
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
                <h2>View blogs or create a new one!</h2>
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
                    <Link to="/users">users</Link> &nbsp;
                    You are signed in as {this.props.credentials.name} &nbsp;
                    <button onClick = {() => this.props.logout()}>logout</button>
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