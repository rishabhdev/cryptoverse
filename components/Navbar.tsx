import Link from 'next/link'
import { Bitcoin } from 'lucide-react'
import { CurrencySelector } from './CurrencySelector'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-primary text-primary-foreground shadow-md z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Bitcoin className="h-8 w-8" />
            <span className="text-2xl font-bold">CryptoVerse</span>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-baseline space-x-4">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
            <CurrencySelector />
          </div>
        </div>
      </div>
    </nav>
  )
}

