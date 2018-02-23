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

const create =  (blog) => {
    const token  = loginService.getToken()
    const config = {
        headers: { 'Authorization': token }
      }
    return axios.post(baseUrl, blog, config)

}

const update = (blog) => {
    const url = baseUrl + "/" + blog.id
    return axios.put(url, blog)
}

const deleteBlog = (blog) => {
    const token  = loginService.getToken()
    const config = {
        headers: { 'Authorization': token }
      }
    return axios.delete(getUrlOfBlog(blog), config)

}

export default {getAll, create, update, deleteBlog}