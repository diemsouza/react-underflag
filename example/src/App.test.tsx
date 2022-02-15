import React from 'react'
import App from './App'
import { render, waitFor } from '@testing-library/react'

describe('React Underflag Component', () => {
  describe('Get features from useFeature', () => {
    it('should render feature featureA when it is on', async () => {
      const { queryByText } = render(<App />)
      await waitFor(() => {
        expect(queryByText(/feature a/i)).not.toBeNull()
      })
    })

    it('should render feature featureB when it is off', async () => {
      const { queryByText } = render(<App />)
      await waitFor(() => {
        expect(queryByText(/feature x/i)).toBeNull()
      })
    })
  })

  describe('Get features from useUnderflag', () => {
    it('should render feature featureC when it is on', async () => {
      const { queryByText } = render(<App />)
      await waitFor(() => {
        expect(queryByText(/feature c/i)).not.toBeNull()
      })
    })

    it('should render feature featureD when it is off', async () => {
      const { queryByText } = render(<App />)
      await waitFor(() => {
        expect(queryByText(/feature d/i)).toBeNull()
      })
    })
  })
})
