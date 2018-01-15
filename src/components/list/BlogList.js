import React from 'react'
import blogService from '../../services/blogService'
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
        return this.state.blogs.map((blog) => {
            return (<li key = {blog.id}>{blog.title} {blog.author}</li>)
        }) 
    }

    render() {
        return (
            <div>
                <ul>
                   {this.makeListOfElements()}
                </ul>
            </div>
        )
    }
}

export default BlogList