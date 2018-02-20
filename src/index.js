import React from 'react';
import ReactDOM from 'react-dom';
import BlogApp from './components/BlogApp'
import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers} from 'redux'
import { Provider } from 'react-redux'

const reducer = combineReducers({
    notification: notificationReducer
  })

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <BlogApp/>
  </Provider>, 
document.getElementById('root')
);
