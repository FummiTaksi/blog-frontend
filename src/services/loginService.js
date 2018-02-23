import axios from 'axios'
const baseUrl = "/api/login"

let token = null
let currentUser = undefined

const setToken = (newToken) => {
    token = `bearer ${newToken}`
  }

  const setCurrentUser = (loggedInUser) => {
      currentUser = loggedInUser
  }

  const getCurrentUser = () => {
      return currentUser
  }

  const getToken = () => {
      return token
  }

const login = async (credentials) => {
    try {
        const response =  await axios.post(baseUrl, credentials)
        return response.data
    }
    catch(error) {
        return error
    }
   
}

export default {login, setToken, getToken, setCurrentUser, getCurrentUser}