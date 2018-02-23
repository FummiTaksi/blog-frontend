import React from 'react'
import Input from '../input/Input'
import blogService from '../../services/blogService'
import { connect } from 'react-redux'
import { notificationChange } from '../../reducers/notificationReducer'

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

    createBlog =  (e) => {
        e.preventDefault()
        const response = blogService.create(this.state)
        response.then(result => {
            this.props.notificationChange("A new blog '" + result.data.title + "' by " + result.data.author + " added succesfully")
        }).catch(error => {
            this.props.notificationChange("Error occured")
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

const mapDispatchToProps = {
    notificationChange
}

const ConnectedBlogForm = connect(
    null,
    mapDispatchToProps
  )(BlogForm)

export default ConnectedBlogForm