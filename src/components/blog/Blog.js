import React from 'react'

class Blog extends React.Component {

    render() {
        console.log("this.props.blog",this.props.blog)
        const blog = this.props.blog
        const user = blog.user ? blog.user.name : "No user!"
        return (
            <div key= {blog.id} onClick = {this.props.onClick}>
                <b>{blog.title} {blog.author}</b>   
                <a href = {blog.url}>{blog.url}</a>
                <div>
                    {blog.likes} likes 
                    <button>like</button>
                </div>
                <p>added by {user}</p>        
            </div>
        )
    }
}
export default Blog