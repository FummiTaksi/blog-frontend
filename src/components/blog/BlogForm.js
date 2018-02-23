import React from 'react'
import Input from '../input/Input'
import { connect } from 'react-redux'
import { notificationChange } from '../../reducers/notificationReducer'
import { blogCreation } from '../../reducers/blogReducer'

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

    notificationForSuccessfullCreation = () => {
        return "A new blog " + this.state.title + " by " + this.state.author + 
               " was created successfully!"
    }

    createBlog =  (e) => {
        e.preventDefault()
        this.props.blogCreation(this.state)
        this.props.notificationChange(this.notificationForSuccessfullCreation(), 5)
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
    notificationChange,
    blogCreation
}

const ConnectedBlogForm = connect(
    null,
    mapDispatchToProps
  )(BlogForm)

export default ConnectedBlogForm