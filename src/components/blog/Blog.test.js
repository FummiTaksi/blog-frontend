import React from 'react'
import { shallow, configure } from 'enzyme'
import Blog from './Blog'
import setUpTests from '../../setup/setUpTests'

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('<Blog />', () => {

    let blogObject = {
        title: "Arto and Peter Go Modular",
        author: "Valmet",
        likes: 5
      }
    let blog = <Blog blog = {blogObject} />

    it('when clicked, big mode is toggled', () => {
        const blogComponent = shallow(blog)
        const p = blogComponent.find('.clickable')
        p.simulate('click')
        const text = blogComponent.text()
        expect(text).toContain(blogObject.likes)
        expect(text).toContain("added by")
    })
})