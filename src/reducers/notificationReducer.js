const initialState = ""

const reducer = (store = initialState, action) => {
    if (action.type === 'CHANGE_NOTIFICATION') {
        return action.message
    }
    return store
}

export const notificationChange = (message) => {
    return {
        type: 'CHANGE_NOTIFICATION',
        message
      }
}

export default reducer