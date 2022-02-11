import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { UnderflagProvider, useFeature } from '.'

type WrapperProps = {
  children: React.ReactNode
}

describe('useFeature', () => {
  it('should return true for feature', async () => {
    const wrapper = ({ children }: WrapperProps) => (
      <UnderflagProvider dataProvider={{ feature: true }}>
        {children}
      </UnderflagProvider>
    )

    const { result, waitFor } = renderHook(() => useFeature(['feature']), {
      wrapper
    })

    await waitFor(() => result.current.length > 0)

    const [featureA] = result.current

    expect(featureA.isOn()).toBe(true)
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
    const { result, waitFor } = renderHook(() => useFeature(['feature']), {
      wrapper
    })

    await waitFor(() => result.current.length > 0)

    const [featureA] = result.current

    expect(featureA.isOn()).toBe(false)
  })

  it('should return undefined', async () => {
    const wrapper = ({ children }: WrapperProps) => (
      <UnderflagProvider dataProvider={{}}>{children}</UnderflagProvider>
    )

    const { result, waitFor } = renderHook(() => useFeature(['feature']), {
      wrapper
    })

    await waitFor(() => result.current.length > 0)

    const [feature] = result.current
    expect(feature).toBeUndefined()
  })
})
