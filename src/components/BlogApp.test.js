import React from 'react'
import { mount} from 'enzyme'
import BlogApp from './BlogApp'
import SignInForm from './signin/SignInForm'
jest.mock('../services/blogService')
import BlogList from './list/BlogList'
import blogService from '../services/blogService'
import setUpTests from '../setup/setUpTests'
import Blog from './blog/Blog'

describe('<BlogApp />', () => {
    let app
  
    describe('when user is not logged', () => {

      beforeEach(() => {
        app = mount(<BlogApp />)
      })
  
      it('only login form is rendered', () => {
        const blogApp = mount(<BlogApp />)
        const form = blogApp.find(SignInForm)
        const blogs = blogApp.find(Blog)
        expect(form.length).toBe(1)
        expect(blogs.length).toBe(0)
      })
    })

    describe('when user is logged in', () => {

      beforeEach(() => {
        const user = {
          username: "testaccount",
          name: "Testi Testinen",
          token : "sjasfjaslf"
        }
        localStorage.setItem('loggedUser',JSON.stringify(user))
        app = mount(<BlogApp/>)
      })

      it('shows bloglist', () => {
        app.update()
        const list = app.find(BlogList)
        const form = app.find(SignInForm)
        expect(form.length).toBe(0)
        expect(list.length).toBe(1)
        expect(app.text()).toContain('Kaiku kalliolla')

      })
    })
  
  })