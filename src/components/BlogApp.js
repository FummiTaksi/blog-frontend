import React from 'react'
import SignInForm from './signin/SignInForm'
import BlogList from './list/BlogList'

class BlogApp extends React.Component {
    
    constructor() {
        super()
        this.state = {
            blog: false,
            user: "",
            currentUser: ""
        }
    }

    updateUser = (userInfo) => {
        this.setState({
            user: userInfo.token,
            currentUser: userInfo.currentUser
        })
    }
 
    blogList =  () => {
        return (
            <div>
                <h3>You are logged in as {this.state.currentUser}</h3>
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