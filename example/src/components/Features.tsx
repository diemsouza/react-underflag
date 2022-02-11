import React from 'react'
import { useFeature, useUnderflag } from 'react-underflag'

const Features = () => {
  const { underflag } = useUnderflag()
  const [showFeatureA, setShowFeatureA] = React.useState(false)
  const [showFeatureB, setShowFeatureB] = React.useState(false)
  const [featureC] = useFeature(['featureC'])

  React.useEffect(() => {
    underflag.isOn('test_a').then(res => setShowFeatureA(res))
    underflag.isOn('test_b').then(res => setShowFeatureB(res))
  }, [underflag])

  return <>
    <h1>Features</h1>
    {showFeatureA && <h3>Feature A</h3>}
    {showFeatureB && <h3>Feature B</h3>}
    {featureC?.isOn() && <h3>Feature C</h3>}
  </>
}

export default Features
