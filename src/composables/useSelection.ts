import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { Store } from '@/types'

export function useSelection(stores: Ref<Store[]>) {
  const selectionOrder = ref(new Map<number | string, number>())
  const orderCounter = ref(1)

  const selectedStores = computed(() => {
    return stores.value
      .filter(store => store.isSelected)
      .sort((a, b) => {
        const orderA = selectionOrder.value.get(a.id) || 0
        const orderB = selectionOrder.value.get(b.id) || 0
        return orderA - orderB
      })
  })

  const isAllSelected = computed(() => 
    stores.value.length > 0 && stores.value.every(store => store.isSelected)
  )

  const toggleStoreSelection = (store: Store) => {
    if (!store.isSelected) {
      selectionOrder.value.set(store.id, orderCounter.value++)
    } else {
      selectionOrder.value.delete(store.id)
    }
    store.isSelected = !store.isSelected
  }

  const toggleSelectAll = () => {
    const newState = !isAllSelected.value
    stores.value.forEach(store => {
      store.isSelected = newState
      if (newState) {
        selectionOrder.value.set(store.id, orderCounter.value++)
      } else {
        selectionOrder.value.delete(store.id)
      }
    })
    if (!newState) {
      orderCounter.value = 1
    }
  }

  const handleRemoveStore = (store: Store) => {
    selectionOrder.value.delete(store.id)
    store.isSelected = false
  }

  const handleClearAll = () => {
    selectionOrder.value.clear()
    orderCounter.value = 1
    stores.value.forEach(store => store.isSelected = false)
  }

  return {
    selectedStores,
    isAllSelected,
    selectionOrder,
    toggleStoreSelection,
    toggleSelectAll,
    handleRemoveStore,
    handleClearAll
  }
}
