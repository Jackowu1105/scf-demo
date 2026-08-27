import type { Asset } from '@/types/asset'

export const initialAssets: Asset[] = [
  {
    assetId: "ASSET_DEMO 1",
    listDate: "2025/01/06",
    updateDate: "2025/01/09",
    investment: "1M",
    assetGrade: "A8",
    storeCount: 15,
    monthlySales: 100000,
    monthlyGrowth: 85
  },
  {
    assetId: "ASSET_DEMO 2",
    listDate: "2025/01/07",
    updateDate: "2025/01/10",
    investment: "2.5M",
    assetGrade: "A7",
    storeCount: 23,
    monthlySales: 250000,
    monthlyGrowth: -12
  },
  {
    assetId: "ASSET_DEMO 3",
    listDate: "2025/01/08",
    updateDate: "2025/01/11",
    investment: "800K",
    assetGrade: "A6",
    storeCount: 8,
    monthlySales: 75000,
    monthlyGrowth: 32
  },
  {
    assetId: "ASSET_DEMO 4",
    listDate: "2025/01/09",
    updateDate: "2025/01/12",
    investment: "1.8M",
    assetGrade: "A8",
    storeCount: 19,
    monthlySales: 180000,
    monthlyGrowth: -8
  },
  {
    assetId: "ASSET_DEMO 5",
    listDate: "2025/01/10",
    updateDate: "2025/01/13",
    investment: "3M",
    assetGrade: "A7",
    storeCount: 27,
    monthlySales: 320000,
    monthlyGrowth: 45
  }
]