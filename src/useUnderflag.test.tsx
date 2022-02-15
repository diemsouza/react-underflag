import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { UnderflagProvider, useUnderflag } from '.'

type WrapperProps = {
  children: React.ReactNode
}

describe('useUnderflag', () => {
  it('should return true for feature', async () => {
    const wrapper = ({ children }: WrapperProps) => (
      <UnderflagProvider dataProvider={{ feature: true }}>
        {children}
      </UnderflagProvider>
    )

    const { result } = renderHook(() => useUnderflag(), {
      wrapper
    })

    const { underflag } = result.current
    const feature = await underflag.isOn('feature')
    expect(feature).toBe(true)
  })

  it('should return false for feature', async () => {
    const wrapper = ({ children }: WrapperProps) => (
      <UnderflagProvider
        dataProvider={{
          feature: false
        }}
      >
        {children}
      </UnderflagProvider>
    )
    const { result } = renderHook(() => useUnderflag(), {
      wrapper
    })

    const { underflag } = result.current
    const feature = await underflag.isOn('feature')
    expect(feature).toBe(false)
  })

  it('should return false when undefined', async () => {
    const wrapper = ({ children }: WrapperProps) => (
      <UnderflagProvider dataProvider={{}}>{children}</UnderflagProvider>
    )

    const { result } = renderHook(() => useUnderflag(), {
      wrapper
    })

    const { underflag } = result.current
    const feature = await underflag.isOn('feature')
    expect(feature).toBeFalsy()
  })

  it('should return true, false and undefined simultaneously', async () => {
    const wrapper = ({ children }: WrapperProps) => (
      <UnderflagProvider dataProvider={{ featureA: true, featureB: false }}>
        {children}
      </UnderflagProvider>
    )

    const { result } = renderHook(() => useUnderflag(), {
      wrapper
    })

    const { underflag } = result.current
    const [featureA, featureB, featureC] = await underflag.getFeatures([
      'featureA',
      'featureB',
      'FeatureC'
    ])
    expect(featureA).toBeTruthy()
    expect(featureA?.value).toBeTruthy()
    expect(featureB).toBeTruthy()
    expect(featureB?.value).toBeFalsy()
    expect(featureC).toBeUndefined()
  })
})
