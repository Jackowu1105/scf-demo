import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { Store, SortState } from '@/types'

export function useSort(stores: Ref<Store[]>) {
  const sortState = ref<SortState>({
    key: 'monthlySales',
    direction: 'desc'
  })

  const handleSort = (key: string) => {
    sortState.value = {
      key,
      direction: sortState.value.key === key
        ? sortState.value.direction === 'desc' 
          ? 'asc' 
          : sortState.value.direction === 'asc' 
            ? null 
            : 'desc'
        : 'desc'
    }
  }

  const sortedStores = computed(() => {
    if (!sortState.value.key || !sortState.value.direction) {
      return stores.value
    }

    return [...stores.value].sort((a, b) => {
      const valueA = a[sortState.value.key as keyof Store]
      const valueB = b[sortState.value.key as keyof Store]
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortState.value.direction === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA)
      }
      
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortState.value.direction === 'asc' ? valueA - valueB : valueB - valueA
      }
      
      return 0
    })
  })

  return {
    sortState,
    handleSort,
    sortedStores
  }
}
