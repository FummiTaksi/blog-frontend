import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { tokenChanger} from './services/blogService'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    login: loginReducer,
    users: userReducer
  })

const store = createStore(
    reducer,
    applyMiddleware(thunk, tokenChanger)
)

export default store