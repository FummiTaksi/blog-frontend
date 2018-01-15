import axios from 'axios'
import loginService from './loginService'
const baseUrl = "http://localhost:3001/api/blogs"

const getAll = () => {
    return axios.get(baseUrl)
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