import React from 'react'
import { blogInitialization } from '../../reducers/blogReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class BlogList extends React.Component {

    componentDidMount() {
        this.props.blogInitialization()
    }

    makeListOfElements = () => {
       const copyList =  this.props.blogs.slice()
       const sorted = copyList.sort((a,b) => {
           return b.likes - a.likes
       })
        return sorted.map((blog) => {
            return (
              <li key = {blog.id}>
                <Link to = {`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
              </li>
            )
        }) 
    }

    render() {
        return (
            <ul>
              {this.makeListOfElements()}
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      blogs: state.blogs
    }
  }
  
  const ConnectedBlogList = connect(
    mapStateToProps, 
    { blogInitialization }
  )(BlogList)

export default ConnectedBlogList