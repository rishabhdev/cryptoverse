'use client'

import { useState, useEffect } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const currencies = [
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
  { value: "gbp", label: "GBP" },
  { value: "jpy", label: "JPY" },
]

export function CurrencySelector() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  console.log("value", value);
  useEffect(() => {
    const savedCurrency = localStorage.getItem('preferredCurrency') || 'usd'
    setValue(savedCurrency)
  }, [])

  useEffect(() => {
    if (value) {
      localStorage.setItem('preferredCurrency', value)
      window.dispatchEvent(new Event('currencyChange'))
    }
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-[100px] justify-between text-primary"
        >
          {value ? currencies.find((currency) => currency.value === value)?.label : "USD"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100px] p-0 bg-popover">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No currency found.</CommandEmpty>
          <CommandGroup>
            <CommandList>      
                    {currencies.map((currency) => (
              <CommandItem
                value={currency.value}
                key={currency.value}
                onSelect={(currentValue) => {
                  console.log("currentValue", currentValue)
                  setValue(currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === currency.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {currency.label}
              </CommandItem>
            ))}
            </CommandList>

          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

