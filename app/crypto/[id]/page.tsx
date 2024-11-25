import { notFound } from 'next/navigation'
import { RecentlyViewed } from '@/components/RecentlyViewed'
import { AddToRecentlyViewed } from '@/components/AddToRecentlyViewed'
import { CryptoDetails } from '@/components/CryptoDetails'

async function getCryptoData(id: string) {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`, { next: { revalidate: 60 } })
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function CryptoPage({ params }: { params: { id: string } }) {
  const crypto = await getCryptoData(params.id)

  if (!crypto) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <RecentlyViewed />
      <AddToRecentlyViewed crypto={crypto} />
      <CryptoDetails crypto={crypto} />
    </div>
  )
}

