import React from 'react'
import loginService from '../../services/loginService'
import { connect } from 'react-redux'
import { notificationChange } from '../../reducers/notificationReducer'
import { blogLike, blogDeletion} from '../../reducers/blogReducer'

class Blog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            smallMode: true
        }
    }


    submitLike = (e) => {
        e.preventDefault()
        this.props.blogLike(this.props.blog)
        this.props.notificationChange("You liked " + this.props.blog.title, 5)
    }

    deleteBlog = (e) => {
        e.preventDefault();
        const title = this.props.blog.title
        if (window.confirm("haluatko varmasti poistaa blogin " + title + " ?")) {
            this.props.blogDeletion(this.props.blog)
            this.props.notificationChange("Blog " + title + " deleted successfully!", 5)
        }
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
    }

    returnBigMode = (blog, user) => {
        return (
            <div key= {blog.id} >
                <b className = "bold" onClick = {() => this.toggleSmallMode()}>{blog.title} {blog.author}</b>   
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
            <p className = "clickable" onClick = {() => this.toggleSmallMode()} key = {blog.id}>{blog.title} {blog.author}</p>
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

const mapDispatchToProps = {
    notificationChange,
    blogLike,
    blogDeletion
}

const ConnectedBlog = connect(
    null,
    mapDispatchToProps
  )(Blog)
export default ConnectedBlog