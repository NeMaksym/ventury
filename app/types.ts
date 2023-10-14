interface Category {
  id: string
  label: string
}

interface Group {
  id: string
  label: string
  categories: Category[]
}

interface Mono_Client {
  id: string
  accounts: Mono_Account[]
}

interface Mono_Account {
  id: string
  balance: number
  creditLimit: number
  type: Mono_AccountType
  currencyCode: number
  maskedPan: string[]
  iban: string
}

type Mono_AccountType =
  | 'black'
  | 'white'
  | 'platinum'
  | 'iron'
  | 'fop'
  | 'yellow'
  | 'eAid'

interface Pb_Account {
  maskedPan: string[]
}
