import axios from 'axios'
const baseUrl = "http://localhost:3001/api/login"

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
        return await axios.post(baseUrl, credentials)
    }
    catch(error) {
        return error
    }
   
}

export default {login, setToken, getToken, setCurrentUser, getCurrentUser}