import React from 'react'
import { shallow, configure } from 'enzyme'
import SimpleBlog from './SimpleBlog'
import setUpTests from '../../setup/setUpTests'

describe.only('<SimpleBlog />', () => {

    let blog = {
        title: "Arto and Peter Go Modular",
        author: "Valmet",
        likes: 5
      }
    let klik = () => {console.log("KLIK!")}
    let mockHandler = jest.fn()
    let simpleBlog = <SimpleBlog blog={blog} onClick = {mockHandler} />



  it('renders title', () => {
    const blogComponent = shallow(simpleBlog)
    const contentDiv = blogComponent.find('.info')
    expect(contentDiv.text()).toContain(blog.title)
  })

  it('renders author', () => {
    const blogComponent = shallow(simpleBlog)
    const contentDiv = blogComponent.find('.info')
    expect(contentDiv.text()).toContain(blog.author)
  })

  it('renders likes', () => {
    const blogComponent = shallow(simpleBlog)
    const contentDiv = blogComponent.find('.likes')
    expect(contentDiv.text()).toContain(blog.likes)
  })

  it('when button is clicked twice, eventhandler is called twice', () => {
    const blogComponent = shallow(simpleBlog)
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
  })

})