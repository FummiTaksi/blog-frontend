import blogService from '../services/blogService'

const initialState = []

const reducer = (store = initialState, action) => {

    if (action.type === 'INIT') {
      return action.content
    }

    if (action.type === 'CREATE') {
      const newList = [...store, action.content]
      return newList
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

export const blogCreation = (content) => {
    return async (dispatch) => {
      const response = await blogService.create(content)
      dispatch({
        type: 'CREATE',
        content: response
      })
    }
  }

export default reducer