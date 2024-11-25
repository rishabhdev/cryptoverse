import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CurrencySelector } from '@/components/CurrencySelector'

describe('CurrencySelector', () => {
  it('renders the currency selector with default USD', () => {
    render(<CurrencySelector />)
    expect(screen.getByRole('combobox')).toHaveTextContent('USD')
  })

  it('opens the currency list when clicked', () => {
    render(<CurrencySelector />)
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByText('EUR')).toBeInTheDocument()
    expect(screen.getByText('GBP')).toBeInTheDocument()
    expect(screen.getByText('JPY')).toBeInTheDocument()
  })

  it('changes the selected currency', () => {
    render(<CurrencySelector />)
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getByText('EUR'))
    expect(screen.getByRole('combobox')).toHaveTextContent('EUR')
  })

  it('stores the selected currency in localStorage', () => {
    render(<CurrencySelector />)
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getByText('GBP'))
    expect(localStorage.getItem('preferredCurrency')).toBe('gbp')
  })
})

