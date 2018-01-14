import axios from 'axios'
const baseUrl = "http://localhost:3001/api/login"


const login = async (credentials) => {
    try {
        return await axios.post(baseUrl, credentials)
    }
    catch(error) {
        return error
    }
   
}

export default {login}