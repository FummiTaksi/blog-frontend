import userService from '../services/userService'

const initialState = []

const reducer = (store = initialState, action) => {
    if (action.type === 'INIT_USERS') {
        console.log("INITOIN KÄYTTÄJÄT")
        return action.content
    }
    return store
}

export const userInitialization = () => {
    console.log("INIT USERS")
    return async (dispatch) => {
      const users = await userService.getAll()
      dispatch({
        type: 'INIT_USERS',
        content: users
      })
    }
}

export default reducer