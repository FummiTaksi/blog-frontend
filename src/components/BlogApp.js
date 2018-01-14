import React from 'react'
import SignInForm from './signin/SignInForm'
import BlogList from './list/BlogList'
import blogService from '../services/blogService'

class BlogApp extends React.Component {
    
    constructor() {
        super()
        this.state = {
            user: ""
        }
    }

    getAllBlogs = async() => {
        const blogs = await blogService.getAllBlogs()
        return blogs;
    }

    setToken = (newToken) => {
        console.log("SETTOKEN")
        this.setState({
            user: newToken
        })
        this.forceUpdate()
    }

    tokenIsDefined = () => {
        return this.state.user > 0
    }
    render() {
        if (this.tokenIsDefined()) {
            return (
                <BlogList blogs = {this.getAllBlogs()}/>
            )
        }
        else {
            return <SignInForm setToken = {this.setToken} />
        }
    }
}

export default BlogApp