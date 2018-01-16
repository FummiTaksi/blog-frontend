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
    const noteComponent = shallow(simpleBlog)
    const contentDiv = noteComponent.find('.info')
    expect(contentDiv.text()).toContain(blog.title)
  })

})