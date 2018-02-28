import React from 'react'
import { connect } from 'react-redux'
import { blogLike, blogDeletion} from '../../reducers/blogReducer'
class BlogView extends React.Component {

    deleteBlog = (e) => {
        e.preventDefault();
        const title = this.props.blog.title
        if (window.confirm("haluatko varmasti poistaa blogin " + title + " ?")) {
            this.props.blogDeletion(this.props.blog)
        }
    }

    isDeleteAllowed = () => {
        const currentUsername = this.props.credentials.username
        const blogsUser = this.props.blog.user
        return !blogsUser || currentUsername === blogsUser.username
    }

    renderButton = () => {
        if (this.isDeleteAllowed()) {
            return (
                <button onClick = {this.deleteBlog}>delete</button>   
            )
        }
    }

    mapComments = (comments) => {
        return comments.map(comment => {
            return <li key = {comment._id}>{comment.content}</li>
        })
    }
    
    commentSection(comments) {
        if (comments.length === 0) {
            return (<h4> This blog dont have comments</h4>)
        }
        return (
            <div>
              <h4>Comments:</h4>
              <ul>
                {this.mapComments(comments)}
              </ul>
            </div>
        )

    }

    render() {
        const blog = this.props.blog
        if (!blog) {
            return (
                <p>Loading...</p>
            )
        }
        return (
            <div>
                <h2>{blog.title}</h2>
                <a href = {blog.url}>{blog.url}</a>
                <div>
                    {blog.likes} likes
                <button onClick = {() => this.props.blogLike(blog)}>like</button>
                <p>added by {blog.author} </p>
                {this.renderButton()}
                {this.commentSection(blog.comments)}
                </div>
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
  blogLike,
  blogDeletion
}

const ConnectedBlogView = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogView)

export default ConnectedBlogView