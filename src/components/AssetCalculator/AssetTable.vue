<script setup lang="ts">
import type { Store, SortState } from '@/types'
import { computed, ref } from 'vue'
import { icons } from '@/constants/icons.ts'
import { TABLE_HEADERS, ITEMS_PER_PAGE } from '@/constants/table.ts'
import { useThemeStore } from '@/stores/useThemeStore'

// Props & Emits
interface Props {
  stores: Store[]
  sortState: SortState
  isAllSelected: boolean
}

interface Emits {
  (e: 'sort', key: string): void
  (e: 'select', store: Store): void
  (e: 'toggleAll'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Pagination
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(props.stores.length / ITEMS_PER_PAGE))
const paginatedStores = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  return props.stores.slice(start, end)
})

// Methods
const handlePageChange = (page: number) => {
  currentPage.value = page
}

const openStore = (storeUrl?: string) => {
  if (!storeUrl) return
  window.open(storeUrl, '_blank', 'noopener,noreferrer')
}

const themeStore = useThemeStore()
</script>

<template>
  <div :class="[$style.tableWrapper, { [$style.darkMode]: themeStore.isDark }]">
    <table :class="$style.storeTable">
      <thead>
        <tr>
          <!-- Radio Button Header -->
          <th :class="[$style.tableHeader, $style.radioCell]">
            <div 
              :class="[$style.radioBtn, { [$style.checked]: isAllSelected }]" 
              @click="emit('toggleAll')"
            />
          </th>
          
          <!-- Store Name Header -->
          <th 
            :class="$style.tableHeader"
            :data-sorting="sortState.key === 'name'"
          >
            <div 
              :class="$style.headerContent"
              :data-active="sortState.key === 'name'"
              @click="emit('sort', 'name')"
            >
              <span>店铺名稱</span>
              <img 
                :src="icons.sort" 
                :class="[$style.sortIcon, {
                  [$style.sortAsc]: sortState.key === 'name' && sortState.direction === 'asc',
                  [$style.sortDesc]: sortState.key === 'name' && sortState.direction === 'desc',
                  [$style.sortInactive]: sortState.key !== 'name' || !sortState.direction
                }]" 
                alt="sort" 
              />
            </div>
          </th>
          
          <!-- Rest of headers -->
          <th 
            v-for="header in TABLE_HEADERS.slice(1)" 
            :key="header.key"
            :class="$style.tableHeader"
            :data-sorting="sortState.key === header.key"
          >
            <div 
              :class="$style.headerContent" 
              :data-active="sortState.key === header.key"
              @click="emit('sort', header.key)"
            >
              <span>{{ header.label }}</span>
              <img 
                :src="icons.sort" 
                :class="[$style.sortIcon, {
                  [$style.sortAsc]: sortState.key === header.key && sortState.direction === 'asc',
                  [$style.sortDesc]: sortState.key === header.key && sortState.direction === 'desc',
                  [$style.sortInactive]: sortState.key !== header.key || !sortState.direction
                }]" 
                alt="sort" 
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="store in paginatedStores"
          :key="store.id"
          :class="[$style.tableRow, { [$style.selected]: store.isSelected }]"
          @click="emit('select', store)"
        >
          <!-- Radio Button Column -->
          <td :class="[$style.tableCell, $style.radioCell]">
            <div 
              :class="[$style.radioBtn, { [$style.checked]: store.isSelected }]" 
              @click.stop="emit('select', store)"
            >
              <img 
                v-if="store.isSelected"
                :src="icons.tick"
                :class="$style.tickIcon"
                alt=""
              />
            </div>
          </td>
          
          <!-- Store Name Column -->
          <td 
            :class="[$style.tableCell, $style.nameCell]"
            :data-sorting="sortState.key === 'name'"
          >
            <div :class="$style.nameWrapper">
              <span>{{ store.name }}</span>
              <img 
                v-if="store.externalUrl"
                :src="icons.link" 
                :class="$style.linkIcon"
                alt="open external link"
                role="link"
                tabindex="0"
                @click.stop="openStore(store.externalUrl)"
                @keyup.enter="openStore(store.externalUrl)"
              />
            </div>
          </td>
          
          <!-- Fixed width columns -->
          <td 
            :class="[$style.tableCell, $style.regionCell]"
            :data-sorting="sortState.key === 'region'"
          >{{ store.region }}</td>
          <td 
            :class="[$style.tableCell, $style.assetLevelCell]"
            :data-sorting="sortState.key === 'assetLevel'"
          >{{ store.assetLevel }}</td>
          <td 
            :class="[$style.tableCell, $style.creditLevelCell]"
            :data-sorting="sortState.key === 'creditLevel'"
          >{{ store.creditLevel }}</td>
          <td 
            :class="[$style.tableCell, $style.monthlySalesCell]"
            :data-sorting="sortState.key === 'monthlySales'"
          >{{ store.monthlySales.toLocaleString() }}</td>
          <td 
            :class="[$style.tableCell, $style.salesGrowthCell]"
            :data-sorting="sortState.key === 'salesGrowth'"
          >
            <span :class="[store.salesGrowth > 0 ? $style.positive : $style.negative]">
              {{ store.salesGrowth > 0 ? '+' : '' }}{{ store.salesGrowth }}%
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add pagination -->
    <div :class="$style.pagination" v-if="totalPages > 1">
      <button 
        :class="[$style.pageButton, { [$style.disabled]: currentPage === 1 }]"
        @click="handlePageChange(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        上一頁
      </button>
      
      <div :class="$style.pageNumbers">
        <button 
          v-for="page in totalPages"
          :key="page"
          :class="[$style.pageNumber, { [$style.active]: currentPage === page }]"
          @click="handlePageChange(page)"
        >
          {{ page }}
        </button>
      </div>

      <button 
        :class="[$style.pageButton, { [$style.disabled]: currentPage === totalPages }]"
        @click="handlePageChange(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        下一頁
      </button>
    </div>
  </div>
</template>

<style module>
/* Layout & Base Styles */
.tableWrapper {
  margin: var(--spacing-md) 0;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.storeTable {
  width: fit-content;
  border-collapse: separate;
  border-spacing: 0;
}

/* Header Section */
.tableHeader {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-white);
  border-bottom: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-weight: 500;
  text-align: left;
  font-size: var(--font-size-xs);
  transition: background-color 0.2s;
}

.headerContent {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  transition: color 0.2s;
  justify-content: flex-start;
  min-width: 0;
}

/* Table Cell Styles */
.tableCell {
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  transition: background-color 0.2s, color 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 0;
}

/* Column Specific Styles */
.radioCell {
  text-align: center;
  width: 48px;
  min-width: 48px;
}

.nameCell {
  min-width: 150px;
  width: 20%;
  max-width: 200px;
  padding-right: var(--spacing-xs);
}

.regionCell,
.assetLevelCell,
.creditLevelCell {
  width: fit-content;
}

.salesGrowthCell,
.monthlySalesCell {
  width: fit-content;
  text-align: right;
}

/* Row Styles */
.tableRow {
  background: var(--bg-white);
  transition: background-color 0.2s;
}

/* Radio Button Styles */
.radioBtn {
  margin: 0 auto;
  width: var(--spacing-md);
  height: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  background: var(--bg-white);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radioBtn.checked {
  border-color: var(--primary-color);
  background: var(--gradient-primary);
}

.radioBtn.checked::after {
  content: '';
  position: absolute;
  width: 9px;
  height: 8px;
  background: url(@/assets/images/Icon/tick.svg) center/contain no-repeat;
}

.tickIcon {
  width: 9px;
  height: 8px;
  object-fit: contain;
}

/* Icon Styles */
.sortIcon {
  width: var(--spacing-sm);
  height: var(--spacing-sm);
  transition: transform 0.2s, opacity 0.2s;
  opacity: 0.3;
}

.linkIcon {
  width: 14px;
  height: 14px;
  opacity: 0;
  transition: all 0.2s;
  cursor: pointer;
  flex-shrink: 0;
}

/* Status & State Styles */
.positive { color: var(--success); }
.negative { color: var(--error); }

.headerContent[data-active="true"] { 
  color: var(--primary-color); 
}

.tableHeader[data-sorting="true"] { 
  background-color: rgba(48, 165, 244, 0.08); 
}

.darkMode .tableHeader[data-sorting="true"] {
  background-color: color-mix(in srgb, var(--primary-light) 15%, var(--bg-dark-secondary));
}

.darkMode .tableCell[data-sorting="true"] {
  background-color: color-mix(in srgb, var(--primary-light) 15%, var(--bg-dark-secondary));
  color: var(--primary-light);
}

.tableCell[data-sorting="true"] {
  background-color: rgba(48, 165, 244, 0.08);
  color: var(--primary-color);
}

/* Interactive States */
.tableRow:hover .tableCell { background-color: var(--bg-hover); }
.tableRow:hover .linkIcon { opacity: 0.5; }
.linkIcon:hover {
  opacity: 1 !important;
  transform: scale(1.1);
}

/* Selection States */
.tableRow.selected .tableCell {
  background-color: color-mix(in srgb, var(--primary-color) 8%, transparent);
}

.tableRow.selected:hover .tableCell {
  background-color: color-mix(in srgb, var(--primary-color) 12%, transparent);
}

/* Cell Content Wrappers */
.nameWrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  width: 100%;
}

/* Pagination Styles */
.pagination {
  display: flex;
  align-items: center;
  justify-content: right;
  gap: var(--spacing-md);
  padding: var(--spacing-sm);
  border-top: 1px solid var(--border-color);
}

.pageNumbers {
  display: flex;
  gap: var(--spacing-xs);
}

.pageButton,
.pageNumber {
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  background: var(--bg-white);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--duration-200) var(--ease-out);
}

/* Pagination States */
.pageButton:hover:not(.disabled),
.pageNumber:hover:not(.active) {
  background: var(--bg-hover);
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.pageNumber.active {
  background: var(--primary-color);
  color: var(--bg-white);
  border-color: var(--primary-color);
}

.pageButton.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: var(--text-light);
}

/* Dark Mode Styles */
.darkMode .tableHeader {
  background: var(--bg-dark-secondary);
  border-color: var(--border-dark);
  color: var(--text-light);
}

.darkMode .tableRow {
  background: var(--bg-dark-secondary);
}

.darkMode .tableCell {
  border-color: var(--border-dark);
  color: var(--text-light);
}

.darkMode .headerContent[data-active="true"] {
  color: var(--primary-light);
}

.darkMode .tableRow:hover .tableCell {
  background-color: var(--bg-dark-hover);
}

.darkMode .tableRow.selected .tableCell {
  background-color: color-mix(in srgb, var(--primary-color) 15%, var(--bg-dark));
}

.darkMode .pagination {
  border-color: var(--border-dark);
}

.darkMode .pageButton,
.darkMode .pageNumber {
  background: var(--bg-dark-secondary);
  border-color: var(--border-dark);
  color: var(--text-light);
}

.darkMode .pageNumber.active {
  background: var(--primary-light);
  color: var(--bg-dark);
  border-color: var(--primary-light);
  font-weight: 500;
}

.darkMode .pageNumber:hover:not(.active) {
  background: var(--bg-dark-hover);
  color: var(--primary-light);
  border-color: var(--primary-light);
}
</style>