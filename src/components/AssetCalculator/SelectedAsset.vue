<script setup lang="ts">
import { ref } from 'vue'
import type { Store } from '@/types'
import { icons } from '@/constants/icons.ts'
import { useThemeStore } from '@/stores/useThemeStore'

interface Props {
  store: Store
  order: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'remove', store: Store): void
}>()

const isRemoving = ref(false)
const themeStore = useThemeStore()

const handleRemove = () => {
  isRemoving.value = true
  setTimeout(() => {
    emit('remove', props.store)
  }, 300)
}

const formatNumber = (num: number) => num.toLocaleString()
</script>

<template>
  <div 
    :class="[
      $style.container,
      { [$style.removing]: isRemoving },
      { [$style.darkMode]: themeStore.isDark }
    ]"
  >
    <div :class="$style.orderBadge">
      {{ order }}
    </div>
    
    <img 
      :src="icons.delete" 
      :class="$style.deleteIcon"
      @click.stop="handleRemove"
      alt="delete"
    />
    <!-- Header Section -->
    <div :class="$style.header">
      <div :class="$style.storeName">{{ store.name }}</div>
    </div>
    
    <!-- Basic Info Section -->
    <div :class="$style.row">
      <div :class="$style.group">
        <div :class="$style.label">地區</div>
        <div :class="$style.value">{{ store.region }}</div>
      </div>
      <div :class="$style.group">
        <div :class="$style.label">資產等級</div>
        <div :class="$style.value">{{ store.assetLevel }}</div>
      </div>
      <div :class="$style.group">
        <div :class="$style.label">信用等级</div>
        <div :class="$style.value">{{ store.creditLevel }}</div>
      </div>
    </div>
    
    <!-- Sales Info Section -->
    <div :class="$style.row">
      <div :class="$style.group">
        <div :class="$style.label">當月销售额 (USD)</div>
        <div :class="$style.value">{{ formatNumber(store.monthlySales) }}</div>
      </div>
      <div :class="$style.group">
        <div :class="$style.label">月销售额环比</div>
        <div :class="[$style.value, $style.alignRight]">
          <div :class="$style.growthIndicator">
            <img 
              :class="$style.trendIcon" 
              :src="store.salesGrowth > 0 ? icons.trendUp : icons.trendDown" 
              alt="trend" 
            />
            <span :class="[
              $style.growthValue,
              store.salesGrowth > 0 ? $style.positive : $style.negative
            ]">
              {{ store.salesGrowth > 0 ? '+' : '' }}{{ store.salesGrowth }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  position: relative;
  width: 100%;
  padding: var(--spacing-md);
  background-color: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--text-primary);
  transform-origin: center;
  transition: all var(--duration-300) var(--ease-out);
  animation: slideIn var(--duration-300) var(--ease-out);
}

.removing {
  animation: slideOut var(--duration-300) var(--ease-out) forwards;
}

.orderBadge {
  position: absolute;
  background: none;
  color: transparent;
  display: flex;
  
  
  
}

.deleteIcon {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  width: var(--spacing-md);
  height: var(--spacing-md);
  cursor: pointer;
  opacity: 0.6;
  z-index: 1;
}

.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: var(--spacing-xs) 0;
}

.storeName {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--primary-color);
  line-height: var(--line-height-normal);
}

.row {
  display: flex;
  gap: var(--spacing-2xl);
  width: 100%;
}

.row + .row {
  margin-top: var(--spacing-xs);
}

.group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  min-width: 0;
}

.label, .value {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.growthIndicator {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.trendIcon {
  width: var(--spacing-sm);
  height: var(--spacing-sm);
  object-fit: contain;
}

.growthValue {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
}

.positive {
  color: var(--success);
}

.negative {
  color: var(--error);
}

.alignRight {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: var(--spacing-sm);
}

.container:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
  background-color: var(--bg-hover);
}

.darkMode {
  background-color: var(--bg-dark);
  border-color: var(--border-dark);
  color: var(--text-light);
}

.darkMode:hover {
  background-color: var(--bg-dark-hover);
  border-color: var(--primary-light);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.darkMode .deleteIcon {
  filter: brightness(0) invert(0.8);
  opacity: 0.5;
}

.darkMode .deleteIcon:hover {
  opacity: 0.8;
}

.darkMode .storeName {
  color: var(--primary-light);
}

.darkMode .label {
  color: var(--text-light);
  opacity: 0.6;
}

.darkMode .value {
  color: var (--text-light);
}

.darkMode .trendIcon {
  filter: brightness(0) invert(0.8);
}

.darkMode .positive {
  color: var(--success);
  opacity: 0.9;
}

.darkMode .negative {
  color: var(--error);
  opacity: 0.9;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-30px);
  }
}

@keyframes popIn {
  0% {
    transform: scale(0);
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>