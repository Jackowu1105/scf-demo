import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { Store } from '@/types'

export function useStores(searchQuery: Ref<string>) {
  const stores = ref<Store[]>([
    {
      id: 1,
      name: '店铺名稱 1',
      region: 'US',
      assetLevel: 'A8',
      creditLevel: 'AAA',
      monthlySales: 934234,
      salesGrowth: 15,
      isSelected: false,
      externalUrl: 'https://www.google.com'
    },
    {
      id: 2,
      name: '店铺名稱 2',
      region: 'US',
      assetLevel: 'A7',
      creditLevel: 'AA',
      monthlySales: 845214,
      salesGrowth: 9,
      isSelected: false,
      externalUrl: 'https://www.google.com'
    },
    {
      id: 3,
      name: '店铺名稱 3',
      region: 'US',
      assetLevel: 'A7',
      creditLevel: 'AA',
      monthlySales: 723245,
      salesGrowth: -5,
      isSelected: false,
      externalUrl: 'https://www.google.com'
    },
    {
      id: 4,
      name: '店铺名稱 4',
      region: 'US',
      assetLevel: 'A6',
      creditLevel: 'AAA',
      monthlySales: 513946,
      salesGrowth: -5,
      isSelected: false,
      externalUrl: 'https://www.google.com'
    },
    {
      id: 5,
      name: '店铺名稱 5',
      region: 'US',
      assetLevel: 'A6',
      creditLevel: 'AA',
      monthlySales: 1963,
      salesGrowth: -3,
      isSelected: false
    },
    {
      id: 6,
      name: '店铺名稱 6',
      region: 'UK',
      assetLevel: 'A7',
      creditLevel: 'AA',
      monthlySales: 654321,
      salesGrowth: 12,
      isSelected: false,
      externalUrl: 'https://www.google.com'
    },
    {
      id: 7,
      name: '店铺名稱 7',
      region: 'UK',
      assetLevel: 'A8',
      creditLevel: 'AAA',
      monthlySales: 789012,
      salesGrowth: 8,
      isSelected: false,
      externalUrl: 'https://www.google.com'
    },
    {
      id: 8,
      name: '店铺名稱 8',
      region: 'CA',
      assetLevel: 'A6',
      creditLevel: 'AA',
      monthlySales: 432198,
      salesGrowth: -2,
      isSelected: false,
      externalUrl: 'https://www.google.com'
    },
    {
      id: 9,
      name: '店铺名稱 9',
      region: 'CA',
      assetLevel: 'A7',
      creditLevel: 'AAA',
      monthlySales: 567890,
      salesGrowth: 7,
      isSelected: false,
      externalUrl: 'https://www.google.com'
    },
    {
      id: 10,
      name: '店铺名稱 10',
      region: 'AU',
      assetLevel: 'A8',
      creditLevel: 'AA',
      monthlySales: 678901,
      salesGrowth: 14,
      isSelected: false,
      externalUrl: 'https://www.google.com'
    },
    {
      id: 11,
      name: '店铺名稱 11',
      region: 'AU',
      assetLevel: 'A7',
      creditLevel: 'AAA',
      monthlySales: 345678,
      salesGrowth: -4,
      isSelected: false,
      externalUrl: 'https://www.google.com'
    },
    {
      id: 12,
      name: '店铺名稱 12',
      region: 'JP',
      assetLevel: 'A6',
      creditLevel: 'AA',
      monthlySales: 890123,
      salesGrowth: 6,
      isSelected: false,
      externalUrl: 'https://www.google.com'
    },
    {
      id: 13,
      name: '店铺名稱 13',
      region: 'JP',
      assetLevel: 'A8',
      creditLevel: 'AAA',
      monthlySales: 456789,
      salesGrowth: 11,
      isSelected: false,
      externalUrl: 'https://www.google.com'
    },
    {
      id: 14,
      name: '店铺名稱 14',
      region: 'SG',
      assetLevel: 'A7',
      creditLevel: 'AA',
      monthlySales: 234567,
      salesGrowth: -6,
      isSelected: false,
      externalUrl: 'https://www.google.com'
    },
    {
      id: 15,
      name: '店铺名稱 15',
      region: 'SG',
      assetLevel: 'A6',
      creditLevel: 'AAA',
      monthlySales: 789012,
      salesGrowth: 5,
      isSelected: false,
      externalUrl: 'https://www.google.com'
    }
  ])

  const filteredStores = computed(() => {
    if (!searchQuery.value) return stores.value
    
    return stores.value.filter(store => 
      store.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  return {
    stores,
    filteredStores
  }
}
