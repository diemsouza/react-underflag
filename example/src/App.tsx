import React from 'react'
import { UnderflagProvider } from 'react-underflag'
import Features from './components/Features'

const App = () => {
  const features = { test_a: true, test_b: false, featureC: true }

  return (
    <UnderflagProvider dataProvider={features} >
      <Features />
    </UnderflagProvider>
  )
}

export default App
