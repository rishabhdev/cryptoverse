import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CryptoTable from '@/components/CryptoTable'

const mockData = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://example.com/bitcoin.png',
    current_price: 50000,
    market_cap: 1000000000000,
    market_cap_rank: 1,
    price_change_percentage_24h: 5.5,
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://example.com/ethereum.png',
    current_price: 3000,
    market_cap: 500000000000,
    market_cap_rank: 2,
    price_change_percentage_24h: -2.1,
  },
]

jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children
  }
})

describe('CryptoTable', () => {
  it('renders the table with initial data', () => {
    render(<CryptoTable initialData={mockData} />)
    
    expect(screen.getByText('Bitcoin')).toBeInTheDocument()
    expect(screen.getByText('Ethereum')).toBeInTheDocument()
    expect(screen.getByText('$50000.00')).toBeInTheDocument()
    expect(screen.getByText('$3000.00')).toBeInTheDocument()
  })

  it('filters the table based on search input', () => {
    render(<CryptoTable initialData={mockData} />)
    
    const searchInput = screen.getByPlaceholderText('Search cryptocurrencies...')
    fireEvent.change(searchInput, { target: { value: 'bitcoin' } })

    expect(screen.getByText('Bitcoin')).toBeInTheDocument()
    expect(screen.queryByText('Ethereum')).not.toBeInTheDocument()
  })

  it('changes currency when currency changes', async () => {
    render(<CryptoTable initialData={mockData} />)

    // Simulate currency change event
    const event = new Event('currencyChange')
    Object.defineProperty(event, 'target', { value: { value: 'eur' } })
    window.dispatchEvent(event)

    // Wait for the component to update
    await screen.findByText('€50000.00')
    expect(screen.getByText('€50000.00')).toBeInTheDocument()
  })
})

