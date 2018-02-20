import React from 'react'
import blogService from '../../services/blogService'
import Blog from '../blog/Blog'

class BlogList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            blogs: []
        }
    }

    updateBlogList() {
        blogService.getAll().then(response => {
            this.setState({
                blogs: response.data
            })
        }).catch(error => {
            console.log(error)
        })
    }

    componentWillMount() {
      this.updateBlogList()
    }

    componentDidUpdate() {
      this.updateBlogList()
    }


    makeListOfElements = () => {
       const copyList =  this.state.blogs.slice()
       const sorted = copyList.sort((a,b) => {
           return b.likes - a.likes
       })
        return sorted.map((blog) => {
            return <Blog key = {blog.id} blog = {blog} alterNotification = {this.props.alterNotification} />
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

export default BlogList