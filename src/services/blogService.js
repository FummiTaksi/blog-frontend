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

export default {getAll, create}