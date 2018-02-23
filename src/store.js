import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers} from 'redux'
import { Provider } from 'react-redux'

const reducer = combineReducers({
    notification: notificationReducer
  })

const store = createStore(reducer)

export default store