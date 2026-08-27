import { ref, computed } from 'vue'
import type { Store } from '@/types'

export interface LocalStore {
  id: string | number;
  isSelected?: boolean;
  // other properties...
}

export const useAssetStore = () => {
  const stores = ref<LocalStore[]>([])
  const selectionOrder = ref<(string | number)[]>([]) // Track selection order

  const selectedStores = computed(() => 
    selectionOrder.value
      .map(id => stores.value.find(store => store.id === id))
      .filter((store): store is Store => store !== undefined)
  )

  const toggleStoreSelection = (store: LocalStore) => {
    const index = selectionOrder.value.indexOf(store.id as number)
    if (index === -1) {
      // Add to selection order when selected
      selectionOrder.value.push(store.id)
      store.isSelected = true
    } else {
      // Remove from selection order when deselected
      selectionOrder.value.splice(index, 1)
      store.isSelected = false
    }
  }

  const handleClearAll = () => {
    selectionOrder.value = [] // Clear selection order
    stores.value.forEach(store => store.isSelected = false)
  }

  const handleRemoveStore = (store: LocalStore) => {
    const index = selectionOrder.value.indexOf(store.id)
    if (index !== -1) {
      selectionOrder.value.splice(index, 1)
    }
    store.isSelected = false
  }

  return {
    stores,
    selectedStores,
    selectionOrder,
    toggleStoreSelection,
    handleClearAll,
    handleRemoveStore
  }
}