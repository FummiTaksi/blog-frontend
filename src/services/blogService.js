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

let token = ''
const getConfigObject = () => {
    return {
        headers: { 'Authorization': token }
      }
}



export const tokenChanger = store => next => action => {
    next(action)
    const state = store.getState()
    console.log("state",state)
    const newToken = state.login.token
    token = `bearer ${newToken}`
  }

export default {getAll, create, update, deleteBlog}