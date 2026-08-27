<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStores } from '@/composables/useStores.ts'
import { useSort } from '@/composables/useSort.ts'
import { useSelection } from '@/composables/useSelection.ts'
import AssetTable from './AssetTable.vue'
import SelectedAsset from './SelectedAsset.vue'
import { icons } from '@/constants/icons.ts'
import { useThemeStore } from '@/stores/useThemeStore'

const themeStore = useThemeStore()

// 搜索相關
const searchQuery = ref('')
const isSearching = ref(false)

// 組合式函數
const { stores, filteredStores } = useStores(searchQuery)
const { sortState, handleSort, sortedStores } = useSort(filteredStores)
const { 
  selectedStores, 
  isAllSelected,
  selectionOrder,
  toggleStoreSelection,
  toggleSelectAll,
  handleRemoveStore,
  handleClearAll
} = useSelection(stores)

// 方法
const handleSearch = () => {
  isSearching.value = true
  setTimeout(() => { isSearching.value = false }, 300)
}

const handleCalculate = () => {
  if (selectedStores.value.length === 0) return
  // TODO: 實現計算邏輯
}
</script>

<template>
  <div 
    :class="[$style.card, { [$style.darkMode]: themeStore.isDark }]"
  >
    <!-- 標題和搜索區 -->
    <div :class="$style.header">
      <div :class="$style.titleContainer">
        <b :class="$style.title">請選擇你的投資的資產組合</b>
      </div>
      <div :class="$style.searchContainer">
        <input
          v-model="searchQuery"
          :class="$style.searchInput"
          type="text"
          placeholder="搜尋店鋪名種"
          @keyup.enter="handleSearch"
        />
        <button 
          :class="[$style.searchButton, { [$style.searching]: isSearching }]"
          @click="handleSearch"
        >
          <img :src="icons.search" alt="search" />
        </button>
      </div>
    </div>

    <AssetTable
      :stores="sortedStores"
      :sort-state="sortState"
      :is-all-selected="isAllSelected"
      @sort="handleSort"
      @select="toggleStoreSelection"
      @toggle-all="toggleSelectAll"
    />

    <!-- Selected Stores Section -->
    <div :class="$style.selectedContainer">
      <div :class="$style.selectedHeader">
        <div :class="$style.selectedCounter">
          已選擇的店鋪 ({{ selectedStores.length }})
        </div>
        <div :class="$style.buttonGroup">
          <button 
            :class="$style.clearButton"
            @click="handleClearAll"
          >
            清除全部
          </button>
          <button 
            :class="$style.calculateButton"
            @click="handleCalculate"
            :disabled="selectedStores.length === 0"
          >
            资产測算
          </button>
        </div>
      </div>
      
      <div :class="[$style.storeList, 'scroll-container']">
        <TransitionGroup
          tag="div"
          :class="[$style.storeGrid, 'stagger']"
          name="asset"
        >
          <SelectedAsset
            v-for="store in selectedStores"
            :key="store.id"
            :store="store"
            :order="selectionOrder.get(store.id) ?? 0"
            @remove="handleRemoveStore"
            :class="'animate slide-x'"
          />
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style module>
.card {
  width: 100%;
  background-color: var(--bg-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
}

.header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.titleContainer {
  flex: 1;
  display: flex;
  align-items: center;
}

.title {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-normal);
  color: var(--primary-color);
  font-weight: 600;
}

.searchContainer {
  position: relative;
  flex: 1;
  display: flex;
}

.searchInput {
  width: 100%;
  height: 32px;
  padding: 0 40px 0 var(--spacing-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  background: var(--bg-white);
}

.searchInput:hover {
  border-color: var(--text-light);
}

.searchInput:focus {
  border-color: var(--primary-color);
  outline: none;
  box-shadow: var(--shadow-sm);
}

.searchInput::placeholder {
  color: var(--text-secondary);
  opacity: 0.5;
}

.searchButton {
  position: absolute;
  right: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-left: 1px solid var(--border-color);
  background: transparent;
  cursor: pointer;
}

.searchButton:hover {
  background-color: var(--bg-hover);
}

.searchButton img {
  width: var(--spacing-md);
  height: var(--spacing-md);
  opacity: 0.65;
  transition: opacity var(--duration-200) var(--ease-out);
}

.searchButton.searching img {
  opacity: 1;
}

.selectedContainer {
  display: flex;
  flex-direction: column;
  margin-top: var(--spacing-md);
}

.selectedHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.selectedCounter {
  font-size: var(--font-size-lg);
  color: var(--primary-color);
  font-weight: 600;
}

.storeList {
  display: grid;
  gap: var (--spacing-md);
  margin: var(--spacing-sm) 0;
  overflow-y: auto;
  padding: 1px var(--spacing-sm) var(--spacing-md) 1px;
}

.buttonGroup {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
  margin-top: var(--spacing-md);
}

.clearButton,
.calculateButton {
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  font-size: var(--font-size-sm);
}

.clearButton {
  background-color: var(--bg-light);
  color: var(--text-secondary);
}

.calculateButton {
  background: var(--gradient-primary);
  color: var(--bg-white);
}

.calculateButton:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.storeGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  position: relative;
}

:global(.asset-move) {
  transition: all var(--duration-300) var(--ease-out);
}

.darkMode.card {
  background-color: var(--bg-dark-secondary);
  border-color: var(--border-dark);
}

.darkMode .title {
  color: var(--primary-light);
}

.darkMode .searchInput {
  background: var(--bg-dark);
  border-color: var(--border-dark);
  color: var(--text-light);
}

.darkMode .searchInput:hover {
  border-color: var(--text-light);
}

.darkMode .searchButton {
  border-color: var(--border-dark);
}

.darkMode .searchButton:hover {
  background-color: var(--bg-dark-hover);
}

.darkMode .clearButton {
  background-color: var(--bg-dark);
  color: var(--text-light);
}

.darkMode .calculateButton:disabled {
  opacity: 0.3;
}

.darkMode .searchButton img {
  filter: brightness(0) invert(0.8);
  opacity: 0.5;
}

.darkMode .searchButton:hover img {
  opacity: 0.8;
}

.darkMode .searchButton.searching img {
  opacity: 1;
  filter: brightness(0) invert(1);
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  .card {
    padding: var(--spacing-md);
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .titleContainer {
    width: 100%;
  }

  .searchContainer {
    width: 100%;
  }

  .selectedHeader {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-sm);
  }

  .buttonGroup {
    width: auto;
    justify-content: flex-end;
    margin-top: 0;
  }

  .storeGrid {
    grid-template-columns: 1fr;
  }

  .storeList {
    padding: 0;
  }
}
</style>