import { ref, computed } from 'vue'
import type { Asset, SortKey } from '@/types/asset'

export function useAssetManagement(initialAssets: Asset[]) {
  const assets = ref<Asset[]>(initialAssets)
  const currentSortKey = ref<SortKey>('updateDate')

  const sortedAssets = computed(() => {
    return [...assets.value].sort((a, b) => {
      const key = currentSortKey.value
      
      if (key === 'investment') {
        return compareInvestment(b[key], a[key])
      }
      
      if (key === 'assetGrade') {
        return b[key].localeCompare(a[key])
      }
      
      if (typeof a[key] === 'number') {
        return (b[key] as number) - (a[key] as number)
      }
      
      return String(b[key]).localeCompare(String(a[key]))
    })
  })

  function compareInvestment(a: string, b: string): number {
    const getValue = (str: string) => parseFloat(str.replace(/[MK]/g, ''))
    return getValue(a) - getValue(b)
  }

  const updateSortKey = (key: SortKey) => {
    currentSortKey.value = key
  }

  return {
    assets,
    sortedAssets,
    currentSortKey,
    updateSortKey
  }
}
