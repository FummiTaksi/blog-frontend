import React from 'react'

class UserInfo extends React.Component {
    
    renderBlogList() {
        return this.props.user.blogs.map(blog => {
            return <li key = {blog._id} >{blog.title} by {blog.author}</li>
        })
    }

    render() {
        console.log("USER",this.props.user)
        return (
            <div>
                <h3>{this.props.user.name}</h3>
                <h4>Added blogs</h4>
                <ul>
                  {this.renderBlogList()}
                </ul>
            </div>
        )
    }
}


export default UserInfo