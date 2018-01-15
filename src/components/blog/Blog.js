import React from 'react'
import blogService from '../../services/blogService'

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

    render() {
        console.log("this.props.blog",this.props.blog)
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
            </div>
        )
    }
}
export default Blog