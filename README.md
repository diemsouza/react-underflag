# react-underflag

This is a REACT component for underflag (feature flag/feature toggle) than help your app to load the features from a json object or an array of json object file, locally or web use http provider.

## Install

```bash
npm install --save react-underflag
```

## Usage

_Config the provider for features_
```tsx
import React from 'react'
import { UnderflagProvider } from 'react-underflag'
import 'react-underflag/dist/index.css'
import Features from './components/Features'

const App = () => {
  const features = { test_a: true, test_b: false }
  return (
  <UnderflagProvider dataProvider={features} >
    <Features />
  </UnderflagProvider>
  )
}

export default App
```

_Use in a component_

```tsx
import React from 'react'
import { useUnderflag } from 'react-underflag'
import 'react-underflag/dist/index.css'

const MyComponent = () => {
  const { underflag } = useUnderflag()
  const [showFeatureA, setShowFeatureA] = React.useState(false)
  const [showFeatureB, setShowFeatureB] = React.useState(false)

  React.useEffect(() => {
    underflag.isOn('test_a').then(res => setShowFeatureA(res))
    underflag.isOn('test_b').then(res => setShowFeatureB(res))
  })

  return <>
    <h1>Features</h1>
    { showFeatureA && <h3>Feature A</h3>}
    { showFeatureB && <h3>Feature B</h3>}
  </>
}

export default MyComponent
```

_Get features from web_

```bash
npm install --save underflag-http
```

```tsx
import React from 'react'
import { UnderflagProvider } from 'react-underflag'
import 'react-underflag/dist/index.css'
import Features from './components/Features'
import { HttpDataProvider } from 'underflag-http'

const App = () => {
  // set your own url
  const dataProvider = new HttpDataProvider({ url: 'http://localhost:3000/features.json' })
  return (
  <UnderflagProvider dataProvider={dataProvider} >
    <Features />
  </UnderflagProvider>
  )
}

export default App
```

Know more on [underflag npm page](https://www.npmjs.com/package/underflag)

### License

[MIT](LICENSE)
