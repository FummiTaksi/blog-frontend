import React from 'react'
import Input from '../input/Input'
import blogService from '../../services/blogService'

class BlogForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            author: "",
            url: ""
        }
    }

    handleFormChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    createBlog =  () => {
        const blog = {
            title: this.state.title,
            author: this.state.author,
            url: this.state.url
        }
        const response = blogService.create(blog)
        console.log("createBlog",response)
        response.then(result => {
            console.log("RESULT",result)
            this.props.alterNotification("A new blog added")
        }).catch(error => {
            console.log("ERROR",error)
            this.props.alterNotification("Error occured")
        })
        this.resetFields()
    }

    resetFields = () => {
        this.setState({
            title: "",
            author: "",
            url: ""
        })
    }

    render() {
        return (
            <div>
                <form onSubmit = {this.createBlog}>
                <Input 
                    text = "Title:"
                    name = "title"
                    value = {this.state.title}
                    onChange = {this.handleFormChange}
                 />
                <Input 
                    text = "Author:"
                    name = "author"
                    value = {this.state.author}
                    onChange = {this.handleFormChange}
                 />
                <Input 
                    text = "Url:"
                    name = "url"
                    value = {this.state.url}
                    onChange = {this.handleFormChange}
                 />
                 <button type="submit">create</button>
                 </form>                 
            </div>
        )
    }
}

export default BlogForm