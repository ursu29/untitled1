import React from 'react'
import Secure from './Secure'
import Root from './Root'
import { BrowserRouter as Router } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Secure>
      <Router basename={process.env.PUBLIC_URL}>
        <Root />
      </Router>
    </Secure>
  )
}

export default App
