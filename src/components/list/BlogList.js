import React from 'react'
import blogService from '../../services/blogService'
import Blog from '../blog/Blog'

class BlogList extends React.Component {

    constructor() {
        super()
        this.state = {
            blogs: [],
            selected: undefined
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

    selectedIsNotSame = (blog) => {
        return !this.state.selected || this.state.selected.id !== blog.id
    }

    makeListOfElements = () => {
        return this.state.blogs.map((blog) => {
            if (this.selectedIsNotSame(blog)) {
                return (<p onClick = {() => this.setState({selected: blog})}
                        key = {blog.id}>{blog.title} {blog.author}</p>)
            }
            else {
                return (<Blog onClick={() => this.setState({selected: undefined})}
                             key = {blog.id} blog = {blog}/>)
            }
            
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