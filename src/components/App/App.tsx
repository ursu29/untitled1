import React from 'react'
import Secure from './Secure'
import Root from './Root'

const App: React.FC = () => {
  return (
    <Secure>
      <Root />
    </Secure>
  )
}

export default App
