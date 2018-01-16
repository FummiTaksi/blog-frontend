import React from 'react'

class SimpleBlog extends React.Component {


   
      
      render() {
          const blog = this.props.blog
        return (
            <div>
              <div className = "info">
                {blog.title} {blog.author}
              </div>
            <div className = "likes">
              blog has {blog.likes} likes
              <button onClick={this.props.onClick}>like</button>
            </div>
          </div>
          )
      }
}

export default SimpleBlog