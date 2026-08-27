import type { Asset, SortKey } from '@/types/asset'

export function sortAssets(assets: Asset[], sortKey: SortKey): Asset[] {
  return [...assets].sort((a, b) => {
    switch(sortKey) {
      case 'investment':
        return compareInvestment(b.investment, a.investment)
      case 'assetGrade':
        return b.assetGrade.localeCompare(a.assetGrade)
      case 'monthlySales':
      case 'storeCount':
      case 'monthlyGrowth':
        return b[sortKey] - a[sortKey]
      default:
        return String(b[sortKey]).localeCompare(String(a[sortKey]))
    }
  })
}

function compareInvestment(a: string, b: string): number {
  const getValue = (str: string) => parseFloat(str.replace(/[MK]/g, ''))
  return getValue(a) - getValue(b)
}
