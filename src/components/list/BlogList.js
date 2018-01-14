import React from 'react'

class BlogList extends React.Component {



    makeListOfElements = () => {
        this.props.blogs.map((blog) => {
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