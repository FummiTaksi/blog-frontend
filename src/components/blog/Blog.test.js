import React from 'react'
import { shallow, configure, mount } from 'enzyme'
import Blog from './Blog'
import setUpTests from '../../setup/setUpTests'

import notificationReducer from '../../reducers/notificationReducer'
import { createStore, combineReducers} from 'redux'
import { Provider } from 'react-redux'

describe('<Blog />', () => {


    let reducer = combineReducers({
        notification: notificationReducer
      })
    
    let store = createStore(reducer)

    let blogObject = {
        title: "Arto and Peter Go Modular",
        author: "Valmet",
        likes: 5
      }

    let blog = <Blog store = {store} blog = {blogObject}/> 


    it('has info about title and author', () => {
        const blogComponent = shallow(blog)
        const text = blogComponent.text()
        expect(text).toContain(blogObject.title)
        expect(text).toContain(blogObject.author)
    })
    it('when clicked, big mode is toggled', () => {
        const blogComponent = shallow(blog)
        const p = blogComponent.find('.clickable')
        p.simulate('click')
        const text = blogComponent.text()
        expect(text).toContain(blogObject.likes)
        expect(text).toContain("added by")
    })
})