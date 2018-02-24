import loginService from '../services/loginService'

const initialState = {
    username: undefined,
    name: undefined,
    token : ""
}

const updateService = (credentials) => {
    loginService.setCurrentUser(credentials)
    loginService.setToken(credentials.token)
}

const reducer = (store = initialState, action) => {
    if (action.type === 'LOGIN') {
        const userInfo = {
            username: action.username,
            token: action.token,
            name: action.name
        }
        updateService(userInfo)
        window.localStorage.setItem('loggedUser', JSON.stringify(userInfo))
        return {
            username: action.username,
            name: action.name,
            token: action.token
        }
    }
    if (action.type === 'LOGOUT') {
        updateService({username: undefined, token: undefined})
        window.localStorage.removeItem('loggedUser')
        return {
            username: undefined,
            name: undefined,
            token: ""
        }
    }
    return store 
}

export const login = (credentials) => {
    return async (dispatch) => {
        const response = await loginService.login(credentials)
        dispatch({
            type: 'LOGIN',
            username: response.username,
            name: response.name,
            token: response.token
        })
    }
}

export const logout = () => {
    return async (dispatch) => {
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export const init = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
          const credentials = JSON.parse(loggedUserJSON)
          dispatch({
              type: 'LOGIN',
              username: credentials.username,
              name: credentials.name,
              token: credentials.token
          })
        }
    }
}

export default reducer