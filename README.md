# react-underflag

This is a REACT component for underflag (feature flag/feature toggle) than help you to load the features from a json object or an array of json object file, locally or from web using http provider.

## Install

```bash
npm install react-underflag
```

## Usage

_Config the provider for features_

```tsx
import React from 'react'
import { UnderflagProvider } from 'react-underflag'
import MyComponent from './components/MyComponent'

const App = () => {
  const features = { test_a: true, test_b: false }
  return (
  <UnderflagProvider dataProvider={features} >
    <MyComponent />
  </UnderflagProvider>
  )
}

export default App
```

### _Use the useFeature hook in your component_

```tsx
import React from 'react'
import { useFeature } from 'react-underflag'

const MyComponent = () => {
  const [feature] = useFeature(['feature_name'])

  return <>
    {feature?.isOn() && <h1>Feature</h1>}
  </>
}

export default MyComponent
```

### _You can use the underflag module too_

```tsx
import React from 'react'
import { useUnderflag } from 'react-underflag'

const MyComponent = () => {
  const { underflag } = useUnderflag()
  const [showFeature, setShowFeature] = React.useState(false)

  React.useEffect(() => {
    underflag.isOn('feature_name')
      .then(res => setShowFeatureA(res))
  },[])

  return <>
    {showFeature && <h1>Feature</h1>}
  </>
}

export default MyComponent
```

### _Get features from web_

```bash
npm install underflag-http
```

```tsx
import React from 'react'
import { UnderflagProvider } from 'react-underflag'
import MyComponent from './components/MyComponent'
import { HttpDataProvider } from 'underflag-http'

const App = () => {
  // set your own url
  const dataProvider = new HttpDataProvider({ url: 'http://localhost:3000/features.json' })
  return (
  <UnderflagProvider dataProvider={dataProvider} >
    <MyComponent />
  </UnderflagProvider>
  )
}

export default App
```

Know more on [underflag npm page](https://www.npmjs.com/package/underflag)

### License

[MIT](LICENSE)
