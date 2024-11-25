'use client'

import { useEffect } from 'react'

interface Crypto {
  id: string
  name: string
  symbol: string
  image: { small: string }
}

export function AddToRecentlyViewed({ crypto }: { crypto: Crypto }) {
  useEffect(() => {
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
    const newItem = {
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      image: crypto.image.small
    }
    
    const updatedList = [newItem, ...recentlyViewed.filter((item: Crypto) => item.id !== crypto.id)].slice(0, 10)
    localStorage.setItem('recentlyViewed', JSON.stringify(updatedList))
  }, [crypto])

  return null
}

