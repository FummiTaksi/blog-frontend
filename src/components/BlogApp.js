import React from 'react'
import SignInForm from './signin/SignInForm'
import BlogList from './list/BlogList'
import blogService from '../services/blogService'

class BlogApp extends React.Component {
    
    constructor() {
        super()
        this.state = {
            blog: false,
            user: ""
        }
    }

    setToken = (newToken) => {
        console.log("SETTING TOKEN AS",newToken)
        this.setState({
            user: newToken
        })
    }

    blogList =  () => {
        return (
            <BlogList />
        )
    }
    
    render() {
        
        return (
            <div>
                {this.state.user.length > 0 && this.blogList()}
                {this.state.user.length === 0 && <SignInForm setToken = {this.setToken} />}
            </div>

        )
        
    }
}

export default BlogApp