import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

let savedItems = {}

const localStorageMock = {
    setItem: (key, item) => {
      savedItem[key] = item
    },
    getItem: (key) => savedItems[key],
    clear: jest.fn(),

    removeItem: (key) => {
        savedItems[key] = undefined
    }
  }
  
  window.localStorage = localStorageMock