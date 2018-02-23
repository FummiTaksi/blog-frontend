import blogService from '../services/blogService'

const initialState = []

const reducer = (store = initialState, action) => {

    if (action.type === 'INIT') {
      return action.content
    }

    return store
  }

export const blogInitialization = () => {
    return async (dispatch) => {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT',
        content: blogs
      })
    }
}

export default reducer