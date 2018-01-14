import axios from 'axios'
const baseUrl = "http://localhost:3001/api/blogs"

const getAll = async() => {
    try {
        return await axios.get(baseUrl)
    }
    catch(error) {
        return error
    }
}

export default {getAll}