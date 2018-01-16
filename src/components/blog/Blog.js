import React from 'react'
import blogService from '../../services/blogService'
import loginService from '../../services/loginService';

class Blog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            smallMode: true
        }
    }


    submitLike = (e) => {
        e.preventDefault()
        this.props.blog.likes += 1
        blogService.update(this.props.blog).then(result => {
            console.log("submitLike SUCCESS",result)
        }).catch(error => {
            console.log("submitLike ERROR",error)
        })
        this.forceUpdate()
    }

    deleteBlog = (e) => {
        e.preventDefault();
        if (window.confirm("haluatko varmasti poistaa blogin " + this.props.blog.title + " ?")) {
            blogService.deleteBlog(this.props.blog).then(result => {
                console.log("deleteBlog SUCCESS",result)
            }).catch(error => {
                console.log("deleteBlog ERROR",error)
            })
        }
        this.forceUpdate()
    }

    isDeleteAllowed = () => {
        const currentUser = loginService.getCurrentUser()
        const blogsUser = this.props.blog.user
        return !blogsUser || currentUser.username === blogsUser.username
    }

    renderButton = () => {
        if (this.isDeleteAllowed()) {
            return (
                <button onClick = {this.deleteBlog}>delete</button>   
            )
        }
    }

    toggleSmallMode = () => {
        this.setState({
            smallMode : !this.state.smallMode
        })
        this.forceUpdate()
    }

    returnBigMode = (blog, user) => {
        return (
            <div key= {blog.id} >
                <b onClick = {() => this.toggleSmallMode()}>{blog.title} {blog.author}</b>   
                <a href = {blog.url}>{blog.url}</a>
                <div>
                    {blog.likes} likes 
                    <button onClick = {this.submitLike}>like</button>
                </div>
                <p>added by {user}</p>
                    {this.renderButton()}
            </div>
        )
    }

    returnSmallMode = (blog) => {
        return (
            <p onClick = {() => this.toggleSmallMode()} key = {blog.id}>{blog.title} {blog.author}</p>
        )
    }

    render() {
        const blog = this.props.blog
        const user = blog.user ? blog.user.name : "No user!"
        const smallMode = this.state.smallMode
        return (
            <div>
              {this.state.smallMode && this.returnSmallMode(blog)}
              {!this.state.smallMode && this.returnBigMode(blog,user)}
            </div>
        )

    }
}
export default Blog