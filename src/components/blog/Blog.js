import React from 'react'
import blogService from '../../services/blogService'
import loginService from '../../services/loginService';

class Blog extends React.Component {


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
        blogService.deleteBlog(this.props.blog).then(result => {
            console.log("deleteBlog SUCCESS",result)
        }).catch(error => {
            console.log("deleteBlog ERROR",error)
        })
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
        else {
            return (<p>LOL</p>)
        }
    }

    render() {
        const blog = this.props.blog
        const user = blog.user ? blog.user.name : "No user!"
        return (
            <div key= {blog.id} >
                <b onClick = {this.props.onClick}>{blog.title} {blog.author}</b>   
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
}
export default Blog