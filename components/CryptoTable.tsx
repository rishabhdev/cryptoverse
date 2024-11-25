'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
// import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Crypto {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  price_change_percentage_24h: number
}

interface CryptoTableProps {
  initialData: Crypto[]
}

export default function CryptoTable({ initialData }: CryptoTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [currency, setCurrency] = useState('usd')
  const [data, setData] = useState(initialData)
  const itemsPerPage = 10
  const router = useRouter();
  useEffect(() => {
    const savedCurrency = localStorage.getItem('preferredCurrency') || 'usd'
    setCurrency(savedCurrency)

    const handleCurrencyChange = () => {
      const newCurrency = localStorage.getItem('preferredCurrency') || 'usd'
      setCurrency(newCurrency)
      fetchData(newCurrency)
    }

    window.addEventListener('currencyChange', handleCurrencyChange)

    return () => {
      window.removeEventListener('currencyChange', handleCurrencyChange)
    }
  }, [])

  const fetchData = async (cur: string) => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${cur}&order=market_cap_desc&per_page=50&page=1&sparkline=false`
    )
    if (res.ok) {
      const newData = await res.json()
      setData(newData)
    }
  }

  const filteredData = data.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const currencySymbol = currency === 'usd' ? '$' : currency === 'eur' ? '€' : currency === 'gbp' ? '£' : '¥'

  return (
    <div>
      <Input
        type="text"
        placeholder="Search cryptocurrencies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Price ({currency.toUpperCase()})</TableHead>
            <TableHead>24h Change</TableHead>
            <TableHead>Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((crypto) => (
            <TableRow onClick={() => router.push(`/crypto/${crypto.id}`)} key={crypto.id} className="cursor-pointer hover:bg-gray-100">
              {/* <Link href={`/crypto/${crypto.id}`} className="contents"> */}
                <TableCell>{crypto.market_cap_rank}</TableCell>
                <TableCell>
                  <span className="flex items-center">
                    <img src={crypto.image} alt={crypto.name} className="w-6 h-6 mr-2" />
                    {crypto.name}
                  </span>
                </TableCell>
                <TableCell>{crypto.symbol.toUpperCase()}</TableCell>
                <TableCell>{currencySymbol}{crypto.current_price.toFixed(2)}</TableCell>
                <TableCell className={crypto.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}>
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </TableCell>
                <TableCell>{currencySymbol}{crypto.market_cap.toLocaleString()}</TableCell>
              {/* </Link> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

