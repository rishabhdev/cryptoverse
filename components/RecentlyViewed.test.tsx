import React from 'react'
import { render, screen } from '@testing-library/react'
import { RecentlyViewed } from '@/components/RecentlyViewed'

jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children
  }
})

describe('RecentlyViewed', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders nothing when there are no recently viewed items', () => {
    render(<RecentlyViewed />)
    expect(screen.queryByText('Recently Viewed')).not.toBeInTheDocument()
  })

  it('renders recently viewed items', () => {
    const recentItems = [
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', image: 'https://example.com/bitcoin.png' },
      { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', image: 'https://example.com/ethereum.png' },
    ]
    localStorage.setItem('recentlyViewed', JSON.stringify(recentItems))

    render(<RecentlyViewed />)

    expect(screen.getByText('Recently Viewed')).toBeInTheDocument()
    expect(screen.getByText('Bitcoin')).toBeInTheDocument()
    expect(screen.getByText('Ethereum')).toBeInTheDocument()
    expect(screen.getByText('BTC')).toBeInTheDocument()
    expect(screen.getByText('ETH')).toBeInTheDocument()
  })
})

