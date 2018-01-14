import axios from 'axios'
const baseUrl = "http://localhost:3001/api/login"


const login = async (credentials) => {
    return await axios.post(baseUrl, credentials)
}

export default {login}