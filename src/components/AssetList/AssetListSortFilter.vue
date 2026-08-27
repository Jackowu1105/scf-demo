<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { icons } from '@/constants/icons'
import { SORT_FILTERS } from '@/constants/filters.ts'
import { useThemeStore } from '@/stores/useThemeStore'

// Types
interface Props {
  modelValue?: string
}

export interface SortFilter {
  text: string
  value: string
}

// Props & Emits
const props = withDefaults(defineProps<Props>(), {
  modelValue: 'updateDate'
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: SortFilter['value']): void
  (e: 'filterChange', value: SortFilter['value']): void
}>()

// State
const isDropdownOpen = ref(false)
const selectedFilter = computed(() => {
  const filter = SORT_FILTERS.find(f => f.value === props.modelValue)
  return filter?.text || '更新日期'
})
const sortOptionRef = ref<HTMLElement | null>(null)
const themeStore = useThemeStore()

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Event handlers
const handleClickOutside = (event: MouseEvent) => {
  if (
    sortOptionRef.value && 
    !sortOptionRef.value.contains(event.target as Node) && 
    isDropdownOpen.value
  ) {
    isDropdownOpen.value = false
  }
}

const toggleDropdown = (event: MouseEvent) => {
  event.stopPropagation()
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectFilter = (filter: SortFilter) => {
  isDropdownOpen.value = false
  emit('update:modelValue', filter.value)
  emit('filterChange', filter.value)
}
</script>

<template>
  <div :class="[$style.sortBox, { [$style.darkMode]: themeStore.isDark }]">
    <!-- Sort Type Section -->
    <div :class="$style.sortType">
      <img 
        :class="$style.sortIcon" 
        :src="icons.order" 
        alt="sort" 
      />
      <div :class="$style.sortLabel">排序方式</div>
    </div>

    <!-- Sort Option Section -->
    <div 
      ref="sortOptionRef"
      :class="$style.sortOption" 
      @click="toggleDropdown"
    >
      <div :class="$style.optionText">
        {{ selectedFilter }}
      </div>
      <img 
        :class="$style.arrowIcon" 
        :src="icons.downArrow" 
        alt="down arrow" 
      />
      
      <!-- Dropdown Menu -->
      <div 
        v-if="isDropdownOpen" 
        :class="$style.dropdown"
      >
        <div
          v-for="filter in SORT_FILTERS"
          :key="filter.value"
          :class="[
            $style.dropdownItem,
            { [$style.active]: selectedFilter === filter.text }
          ]"
          @click.stop="selectFilter(filter)"
        >
          {{ filter.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
/* Layout & Container */
.sortBox {
  display: flex;
  align-items: center;
  font-size: var(--font-size-xs);
  border-radius: var(--radius-md);
  font-family: var(--font-family);
}

/* Sort Type Section */
.sortType {
  border-radius: var(--radius-md) 0 0 var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-xs) var(--spacing-md);
  gap: var(--spacing-xs);
}

.sortLabel {
  line-height: var(--line-height-normal);
  font-weight: 500;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-secondary);
}

/* Sort Option Section */
.sortOption {
  position: relative;
  border-radius: var(--radius-md);
  background-color: var(--bg-white);
  display: flex;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-md);
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  cursor: pointer;
  width: 165px;
  justify-content: space-between;
}

/* Icons */
.sortIcon, 
.arrowIcon {
  width: var(--spacing-md);
  height: var(--spacing-md);
  flex-shrink: 0;
}

.arrowIcon {
  width: var(--spacing-sm);
  height: var(--spacing-sm);
}

/* Text Elements */
.optionText {
  line-height: var(--line-height-normal);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}

/* Dropdown Menu */
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--spacing-xs);
  background-color: var(--bg-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  z-index: var(--z-dropdown);
}

/* Dropdown Items */
.dropdownItem {
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition: background-color 0.2s;
  color: var(--text-secondary);
}

.dropdownItem:hover {
  background-color: var(--bg-hover);
}

.dropdownItem.active {
  background-color: rgba(48, 165, 244, 0.1);
  color: var(--primary-color);
}

.darkMode .sortType {
  color: var(--text-light);
}

.darkMode .sortOption {
  background-color: var(--bg-dark-secondary);
  border-color: var(--border-dark);
}

.darkMode .dropdown {
  background-color: var(--bg-dark-secondary);
  border-color: var(--border-dark);
}

.darkMode .dropdownItem {
  color: var(--text-light);
}

.darkMode .dropdownItem:hover {
  background-color: var(--bg-dark-hover);
}

.darkMode .dropdownItem.active {
  background-color: rgba(48, 165, 244, 0.2);
}
</style>