import React from 'react';
import ReactDOM from 'react-dom';
import BlogApp from './components/BlogApp'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <BlogApp/>
  </Provider>, 
document.getElementById('root')
);
