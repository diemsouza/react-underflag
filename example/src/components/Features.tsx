import React from 'react'
import { useUnderflag } from 'react-underflag'
import 'react-underflag/dist/index.css'

const Features = () => {

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

export default Features
