import React from 'react'
import { mount} from 'enzyme'
import BlogApp from './BlogApp'
import SignInForm from './signin/SignInForm'
import setUpTests from '../setup/setUpTests'

describe('<BlogApp />', () => {
    let app
  
    describe('when user is not logged', () => {

      beforeEach(() => {
        app = mount(<BlogApp />)
      })
  
      it('only login form is rendered', () => {
        const blogApp = mount(<BlogApp />)
        const form = blogApp.find(SignInForm)
        expect(form.length).toBe(1)
      })
    })
  
  })