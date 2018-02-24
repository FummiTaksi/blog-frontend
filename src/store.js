import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { logger } from './services/loginService'
import { tokenChanger} from './services/blogService'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    login: loginReducer
  })

const store = createStore(
    reducer,
    applyMiddleware(thunk, tokenChanger)
)

export default store