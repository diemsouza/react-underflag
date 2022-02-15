import React from 'react'
import { useFeature, useUnderflag } from 'react-underflag'

const MyComponent = () => {
  // ease way
  const [featureA, featureB] = useFeature(['featureA', 'featureB'])

  // using underflag module
  const { underflag } = useUnderflag()
  const [showFeatureC, setShowFeatureC] = React.useState(false)
  const [showFeatureD, setShowFeatureD] = React.useState(false)

  React.useEffect(() => {
    underflag.isOn('featureC').then((res) => setShowFeatureC(res))
    underflag.isOn('featureD').then((res) => setShowFeatureD(res))
  }, [])

  return (
    <>
      {featureA?.isOn() && <h1>Feature A</h1>}
      {featureB?.isOn() && <h1>Feature B</h1>}
      {showFeatureC && <h1>Feature C</h1>}
      {showFeatureD && <h1>Feature D</h1>}
    </>
  )
}

export default MyComponent
