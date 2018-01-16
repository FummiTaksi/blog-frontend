import React from 'react'
import { shallow, configure } from 'enzyme'
import SimpleBlog from './SimpleBlog'
import setUpTests from '../../setup/setUpTests'

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe.only('<Note />', () => {

  it('renders title', () => {
    const blog = {
      title: "Arto and Peter Go Modular",
      author: "Valmet",
      likes: 5
    }
    const klik = () => {console.log("KLIK!")}
    

    const noteComponent = shallow(<SimpleBlog blog={blog} onClick = {klik}/>)
    const contentDiv = noteComponent.find('.info')

    expect(contentDiv.text()).toContain(blog.title)
  })

})