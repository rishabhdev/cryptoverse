'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CryptoDetailsProps {
  crypto: {
    id: string
    name: string
    symbol: string
    image: { small: string }
    market_data: {
      current_price: { [key: string]: number }
      price_change_percentage_24h: number
      high_24h: { [key: string]: number }
      low_24h: { [key: string]: number }
      market_cap: { [key: string]: number }
      total_volume: { [key: string]: number }
      circulating_supply: number
    }
    market_cap_rank: number
    description: { en: string }
  }
}

export function CryptoDetails({ crypto }: CryptoDetailsProps) {
  const [currency, setCurrency] = useState('usd')

  useEffect(() => {
    const savedCurrency = localStorage.getItem('preferredCurrency') || 'usd'
    setCurrency(savedCurrency)

    const handleCurrencyChange = () => {
      const newCurrency = localStorage.getItem('preferredCurrency') || 'usd'
      setCurrency(newCurrency)
    }

    window.addEventListener('currencyChange', handleCurrencyChange)

    return () => {
      window.removeEventListener('currencyChange', handleCurrencyChange)
    }
  }, [])

  const currencySymbol = currency === 'usd' ? '$' : currency === 'eur' ? '€' : currency === 'gbp' ? '£' : '¥'

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <img src={crypto.image.small} alt={crypto.name} className="w-8 h-8" />
          {crypto.name} ({crypto.symbol.toUpperCase()})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Price Information</h3>
            <p>Current Price: {currencySymbol}{crypto.market_data.current_price[currency]?.toFixed(2)}</p>
            <p>24h Change: <span className={crypto.market_data.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}>{crypto.market_data.price_change_percentage_24h.toFixed(2)}%</span></p>
            <p>24h High: {currencySymbol}{crypto.market_data.high_24h[currency]?.toFixed(2)}</p>
            <p>24h Low: {currencySymbol}{crypto.market_data.low_24h[currency]?.toFixed(2)}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Market Information</h3>
            <p>Market Cap: {currencySymbol}{crypto.market_data.market_cap[currency]?.toLocaleString()}</p>
            <p>Market Cap Rank: #{crypto.market_cap_rank}</p>
            <p>Total Volume: {currencySymbol}{crypto.market_data.total_volume[currency]?.toLocaleString()}</p>
            <p>Circulating Supply: {crypto.market_data.circulating_supply?.toLocaleString()} {crypto.symbol.toUpperCase()}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: crypto.description.en }}></p>
        </div>
      </CardContent>
    </Card>
  )
}

