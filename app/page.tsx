import CryptoTable from '@/components/CryptoTable'
import { RecentlyViewed } from '@/components/RecentlyViewed'

export default async function Home() {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
  )
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Top 50 Cryptocurrencies</h1>
      <RecentlyViewed />
      <CryptoTable initialData={data} />
    </main>
  )
}

