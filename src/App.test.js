/* globals it */

// Frameworks
import React from 'react'
import ReactDOM from 'react-dom'

// Components
import { App } from './App'

// Tests
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
