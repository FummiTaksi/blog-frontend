const initialState = ""

const reducer = (store = initialState, action) => {
    if (action.type === 'CHANGE_NOTIFICATION') {
        return action.message
    }
    return store
}

export default reducer