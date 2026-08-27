export interface Asset {
  assetId: string
  listDate: string
  updateDate: string
  investment: string
  assetGrade: string
  storeCount: number
  monthlySales: number
  monthlyGrowth: number
}

export type SortKey = keyof Asset
