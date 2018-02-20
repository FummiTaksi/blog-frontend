import React from 'react';
import ReactDOM from 'react-dom';
import BlogApp from './components/BlogApp'
import notificationReducer from './reducers/notificationReducer'
import { createStore } from 'redux'

const store = createStore(notificationReducer)

ReactDOM.render(<BlogApp store = {store}/>, document.getElementById('root'));
