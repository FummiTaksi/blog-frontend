import axios from 'axios'
import loginService from './loginService'
const baseUrl = "/api/blogs"

const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getUrlOfBlog = (blog) => {
    return baseUrl + "/" + blog.id
}

const create =  async(blog) => {
    const response = await axios.post(baseUrl, blog, getConfigObject())
    return response.data
}

const update = async(blog) => {
    const url = baseUrl + "/" + blog.id
    const response = await axios.put(url, blog)
    return response.data
}

const deleteBlog = async(blog) => {
    const response = await axios.delete(getUrlOfBlog(blog), getConfigObject())
    return response.data
}

const getConfigObject = () => {
    const token  = loginService.getToken()
    return {
        headers: { 'Authorization': token }
      }
}

export default {getAll, create, update, deleteBlog}