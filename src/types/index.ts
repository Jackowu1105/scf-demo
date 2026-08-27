export interface Store {
  id: number
  name: string
  region: string
  assetLevel: string
  creditLevel: string
  monthlySales: number
  salesGrowth: number
  isSelected: boolean
  externalUrl?: string
}

export interface SortState {
  key: string
  direction: 'asc' | 'desc' | null
}