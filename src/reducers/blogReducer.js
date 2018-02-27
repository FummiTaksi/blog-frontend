import blogService from '../services/blogService'
import { dispatchNotification } from './notificationReducer'

const initialState = []

const reducer = (store = initialState, action) => {

    if (action.type === 'INIT_BLOGS') {
      return action.content
    }

    if (action.type === 'CREATE_BLOG') {
      const newList = [...store, action.content]
      return newList
    }

    if (action.type === 'LIKE_BLOG') {
        const notLiked = store.filter(b => b.id !== action.id)
        const liked = store.find(b => b.id === action.id)
        const changed = { ...liked, likes: liked.likes + 1 }
        return store.map((blog => {
          return blog.id === action.id ? changed : blog
        }))
      }

    if (action.type === 'DELETE_BLOG') {
      const notDeleted = store.filter(b => b.id !== action.id)
      return notDeleted
    }

    return store
  }

export const blogInitialization = () => {
    return async (dispatch) => {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        content: blogs
      })
    }
}

export const blogCreation = (content) => {
    return async (dispatch) => {
      try {
        const response = await blogService.create(content)
        const message =  'Blog ' + content.title + ' by ' + content.author + 
                         ' was created successfully!'
        dispatch({
          type: 'CREATE_BLOG',
          content: response
        })
        dispatchNotification(dispatch,message)  
      }
      catch(error) {
       dispatchNotification(dispatch, 'Error at creating blog.')
      }

    }
  }


export const blogLike = (blog) => {
    return async (dispatch) => {
      try {
        const response = await blogService.update({ ...blog, likes: blog.likes + 1})
        dispatch({
          type: 'LIKE_BLOG',
          id: response.id
        })
        const message = 'You liked ' + blog.title + '!'
        dispatchNotification(dispatch, message)
      }
      catch(error) {
        dispatchNotification(dispatch, 'Error at liking blog')
      }
    }
  }

export const blogDeletion = (blog) => {
  return async (dispatch) => {
    try {
    const response = await blogService.deleteBlog(blog)
    dispatch({
      type: 'DELETE_BLOG',
      id: response.id
    })
    const message = 'Blog ' + blog.title + ' was deleted.'
    dispatchNotification(dispatch, message)
  }
    catch(error) {
      const message = blog.title + " was NOT deleted!"
      dispatchNotification(dispatch, message)
   }
  }
}

export default reducer