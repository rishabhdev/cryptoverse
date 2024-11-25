/// <reference types="jest" />

import React from 'react'
import { render } from '@testing-library/react';
import { AddToRecentlyViewed } from '@/components/AddToRecentlyViewed'

describe('AddToRecentlyViewed', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('adds the crypto to recently viewed items in localStorage', () => {
    const mockCrypto = {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      image: { small: 'https://example.com/bitcoin.png' },
    }

    render(<AddToRecentlyViewed crypto={mockCrypto} />)

    const storedItems = JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
    expect(storedItems).toHaveLength(1)
    expect(storedItems[0]).toEqual({
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      image: 'https://example.com/bitcoin.png',
    })
  })

  it('limits the number of recently viewed items to 10', () => {
    const mockCryptos = Array.from({ length: 15 }, (_, i) => ({
      id: `crypto${i}`,
      name: `Crypto ${i}`,
      symbol: `C${i}`,
      image: { small: `https://example.com/crypto${i}.png` },
    }))

    mockCryptos.forEach(crypto => {
      render(<AddToRecentlyViewed crypto={crypto} />)
    })

    const storedItems = JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
    expect(storedItems).toHaveLength(10)
    expect(storedItems[0].id).toBe('crypto14')
    expect(storedItems[9].id).toBe('crypto5')
  })
})

