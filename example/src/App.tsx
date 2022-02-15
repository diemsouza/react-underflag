import React from 'react'
import { UnderflagProvider } from 'react-underflag'
import MyComponent from './components/MyComponent'

const App = () => {
  const features = {
    featureA: true,
    featureB: false,
    featureC: true,
    featureD: false
  }

  return (
    <UnderflagProvider dataProvider={features}>
      <MyComponent />
    </UnderflagProvider>
  )
}

export default App
