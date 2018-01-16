import React from 'react'
import { shallow, configure } from 'enzyme'
import SimpleBlog from './SimpleBlog'
import setUpTests from '../../setup/setUpTests'

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe.only('<SimpleBlog />', () => {

    let blog = {
        title: "Arto and Peter Go Modular",
        author: "Valmet",
        likes: 5
      }
    let klik = () => {console.log("KLIK!")}
    let simpleBlog = <SimpleBlog blog={blog} onClick = {klik} />



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

})