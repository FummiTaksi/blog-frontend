const initialState = ""

const reducer = (store = initialState, action) => {
    if (action.type === 'CHANGE_NOTIFICATION') {
        return action.message
    }
    return store
}

export const notificationChange = (message, time) => {
    return async (dispatch) => {
        dispatch({
            type: 'CHANGE_NOTIFICATION',
            message
          })
        setTimeout(() => {
            dispatch({
              type: 'CHANGE_NOTIFICATION',
              message: ''
            })
        },time * 1000)
    }
}

export default reducer