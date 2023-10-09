interface Category {
  id: string
  label: string
}

interface Group {
  id: string
  label: string
  categories: Category[]
}
