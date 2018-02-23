import loginService from '../services/loginService'

const initialState = {
    username: undefined,
    token : ""
}

const reducer = (store = initialState, action) => {
    console.log("REDUCERISSA,ACTION:",action)
    if (action.type === 'LOGIN') {
        console.log("ACTION: ",action)
        return {
            username: action.username,
            token: action.token
        }
    }
    if (action.type === 'LOGOUT') {
        return {
            username: undefined,
            token: ""
        }
    }
    return store 
}

export const login = (credentials) => {
    return async (dispatch) => {
        const response = await loginService.login(credentials)
        console.log("RESPONSE",response)
        dispatch({
            type: 'LOGIN',
            username: response.username,
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

export default reducer