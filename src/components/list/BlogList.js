import React from 'react'
import blogService from '../../services/blogService'
import Blog from '../blog/Blog'

class BlogList extends React.Component {

    constructor() {
        super()
        this.state = {
            blogs: []
        }
    }

    componentWillMount() {
        blogService.getAll().then(response => {
            this.setState({
                blogs: response.data
            })
        }).catch(error => {
            console.log(error)
        })
    }


    makeListOfElements = () => {
       const copyList =  this.state.blogs.slice()
       const sorted = copyList.sort((a,b) => {
           return b.likes - a.likes
       })
        return sorted.map((blog) => {
            console.log("BLOG",blog)
            return <Blog key = {blog.id} blog = {blog} />
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