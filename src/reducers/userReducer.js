import userService from '../services/userService'

const initialState = []

const reducer = (store = initialState, action) => {
    if (action.type === 'INIT_USERS') {
        return action.content
    }
    return store
}

export const userInitialization = () => {
    return async (dispatch) => {
      const users = await userService.getAll()
      dispatch({
        type: 'INIT_USERS',
        content: users
      })
    }
}

export default reducer