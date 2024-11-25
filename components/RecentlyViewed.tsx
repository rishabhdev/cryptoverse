'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface RecentItem {
  id: string
  name: string
  symbol: string
  image: string
}

export function RecentlyViewed() {
  const [recentItems, setRecentItems] = useState<RecentItem[]>([])

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
    setRecentItems(items)
  }, [])

  if (recentItems.length === 0) return null

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Recently Viewed</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4">
            {recentItems.map((item) => (
              <Link key={item.id} href={`/crypto/${item.id}`} className="flex-shrink-0">
                <div className="w-20 text-center">
                  <img src={item.image} alt={item.name} className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.symbol.toUpperCase()}</p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

