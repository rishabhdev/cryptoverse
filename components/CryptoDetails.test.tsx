/// <reference types="jest" />

import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { CryptoDetails } from '@/components/CryptoDetails'

const mockCrypto = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'btc',
  image: { small: 'https://example.com/bitcoin.png' },
  market_data: {
    current_price: { usd: 50000, eur: 42000, gbp: 36000, jpy: 5500000 },
    price_change_percentage_24h: 5.5,
    high_24h: { usd: 51000, eur: 43000, gbp: 37000, jpy: 5600000 },
    low_24h: { usd: 49000, eur: 41000, gbp: 35000, jpy: 5400000 },
    market_cap: { usd: 1000000000000, eur: 840000000000, gbp: 720000000000, jpy: 110000000000000 },
    total_volume: { usd: 30000000000, eur: 25200000000, gbp: 21600000000, jpy: 3300000000000 },
    circulating_supply: 19000000,
  },
  market_cap_rank: 1,
  description: { en: 'Bitcoin is a decentralized digital currency.' },
}

describe('CryptoDetails', () => {
  it('renders the crypto details correctly', () => {
    render(<CryptoDetails crypto={mockCrypto} />)
    
    expect(screen.getByText('Bitcoin (BTC)')).toBeInTheDocument()
    expect(screen.getByText('Current Price: $50000.00')).toBeInTheDocument()
    expect(screen.getByText('24h Change: 5.50%')).toBeInTheDocument()
    expect(screen.getByText('Market Cap: $1,000,000,000,000')).toBeInTheDocument()
    expect(screen.getByText('Market Cap Rank: #1')).toBeInTheDocument()
    expect(screen.getByText('Bitcoin is a decentralized digital currency.')).toBeInTheDocument()
  })

  it('changes currency display when currency changes', () => {
    render(<CryptoDetails crypto={mockCrypto} />)

    // Simulate currency change event
    const event = new Event('currencyChange')
    Object.defineProperty(event, 'target', { value: { value: 'eur' } })
    window.dispatchEvent(event)

    // Check if the currency display has changed
    expect(screen.getByText('Current Price: €42000.00')).toBeInTheDocument()
    expect(screen.getByText('Market Cap: €840,000,000,000')).toBeInTheDocument()
  })
})

