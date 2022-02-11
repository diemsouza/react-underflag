import React from 'react'
import { render, screen } from "@testing-library/react"
import { UnderflagProvider, useUnderflag } from '.'

const App = () => {
  const features = { test_a: true, test_b: false }

  return (
    <UnderflagProvider dataProvider={features}>
      <Features />
    </UnderflagProvider>
  )
}

const Features = () => {
  const { underflag } = useUnderflag()
  const [showFeatureA, setShowFeatureA] = React.useState(true)
  const [showFeatureB, setShowFeatureB] = React.useState(false)

  React.useEffect(() => {
    underflag.isOn('test_a').then((res) => setShowFeatureA(res))
    underflag.isOn('test_b').then((res) => setShowFeatureB(res))
  }, [])

  return (
    <>
      <h1>Features</h1>
      {showFeatureA && <h3>Feature A</h3>}
      {showFeatureB && <h3>Feature B</h3>}
    </>
  )
}

describe("React Underflag Component", () => {
  it("should render feature test_a when it is on", async () => {
    render(
      <App />
    )

    expect(screen.getByText(/Feature A/)).toBeTruthy();
  });
});