import React from 'react'
import { blogInitialization } from '../../reducers/blogReducer'
import { connect } from 'react-redux'
import Blog from '../blog/Blog'

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
            return <Blog key = {blog.id} blog = {blog}/>
        }) 
    }

    render() {
        return (
            <div>
              {this.makeListOfElements()}
            </div>
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