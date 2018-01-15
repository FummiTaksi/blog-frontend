import axios from 'axios'
import loginService from './loginService'
const baseUrl = "http://localhost:3001/api/blogs"

const getAll = () => {
    return axios.get(baseUrl)
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

export default {getAll, create,update}