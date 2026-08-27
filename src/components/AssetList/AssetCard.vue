<template>
  <div 
    :class="[$style.card, { [$style.darkMode]: themeStore.isDark }]" 
    @click="$emit('click')"
  >
    <!-- Asset Info Section -->
    <div :class="$style.cardHeader">
      <h3 :class="$style.assetId">{{ assetId }}</h3>
      <div :class="$style.datesContainer">
        <div :class="$style.dateItem">
          <span :class="$style.label">上架日期</span>
          <span :class="$style.date">{{ listDate }}</span>
        </div>
        <div :class="$style.dateItem">
          <span :class="$style.label">更新日期</span>
          <span :class="$style.date">{{ updateDate }}</span>
        </div>
      </div>
    </div>

    <!-- Asset Statistics -->
    <div :class="$style.statsContainer">
      <!-- Primary Stats -->
      <div :class="$style.primaryStats">
        <div :class="$style.statItem">
          <span :class="$style.label">投資額 (USD)</span>
          <span :class="$style.statValue">{{ investment }}</span>
        </div>
        <div :class="$style.statItem">
          <span :class="$style.label">資產等級</span>
          <span :class="$style.statValue">{{ assetGrade }}</span>
        </div>
        <div :class="[$style.statItem]">
          <span :class="$style.label"></span>
          <span :class="$style.statValue"></span>
        </div>
      </div>

      <!-- Secondary Stats -->
      <div :class="$style.secondaryStats">
        <div :class="$style.statItem">
          <span :class="$style.label">店铺数量</span>
          <span :class="$style.statValue">{{ storeCount }}</span>
        </div>
        <div :class="$style.statItem">
          <span :class="$style.label">當月销售额 (USD)</span>
          <span :class="$style.statValue">{{ monthlySales.toLocaleString() }}</span>
        </div>
        <div :class="$style.statItem">
          <span :class="$style.label">月销售额环比</span>
          <div :class="$style.growthIndicator">
            <img 
              :src="monthlyGrowth >= 0 ? icons.trendUp : icons.trendDown" 
              :class="$style.growthIcon" 
              alt="trend" 
            />
            <span 
              :class="[$style.growthValue, { 
                [$style.positive]: monthlyGrowth >= 0,
                [$style.negative]: monthlyGrowth < 0 
              }]"
            >
              {{ monthlyGrowth > 0 ? '+' : '' }}{{ monthlyGrowth }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { icons } from '@/constants/icons'
import { useThemeStore } from '@/stores/useThemeStore'

interface Props {
  assetId: string
  listDate: string
  updateDate: string
  investment: string
  assetGrade: string
  storeCount: number
  monthlySales: number
  monthlyGrowth: number
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'click'): void }>()
const themeStore = useThemeStore()
</script>

<style module>
/* Card Base */
.card {
  width: fill-available;
  background-color: var(--bg-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  font-family: var(--font-family);
  border: 1px solid var(--border-color);
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

/* Card Header */
.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.assetId {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--primary-color);
  line-height: var(--line-height-normal);
  margin: 0;
}

/* Date Section */
.datesContainer {
  display: flex;
  gap: var(--spacing-md);
  margin-left: auto;
}

.dateItem {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.date {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  text-align: right;
}

/* Stats Layout */
.statsContainer {
  display: flex;
  flex-direction: column;
}

.primaryStats,
.secondaryStats {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-xl);
}

.statItem {
  display: flex;
  flex-direction: column;
  width: 120px;
  gap: var(--spacing-xs);
}

/* Common Elements */
.label {
  font-size: var(--font-size-xs);
  color: var(--text-light);
  line-height: var(--line-height-normal);
  white-space: nowrap;
}

.statValue {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-secondary);
  line-height: var(--line-height-tight);
  text-align: right;
  width: 100%;
}

/* Growth Indicator */
.growthIndicator {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  width: 100%;
}

.growthIcon {
  width: var(--spacing-md);
  height: var(--spacing-md);
  object-fit: contain;
}

.growthValue {
  font-size: var(--font-size-xl);
  font-weight: 600;
  line-height: var(--line-height-tight);
}

.positive {
  color: var(--success);
}

.negative {
  color: var(--error);
}

/* Dark Mode Styles */
.darkMode {
  background-color: var(--bg-dark-secondary);
  border-color: var(--border-dark);
}

.darkMode:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  background-color: var(--bg-dark-tertiary);
  border-color: var(--primary-light);
}

.darkMode .assetId {
  color: var(--primary-light);
}

.darkMode .date {
  color: var(--text-light);
  opacity: 0.8;
}

.darkMode .label {
  color: var(--text-light);
  opacity: 0.6;
}

.darkMode .statValue {
  color: var(--text-light);
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  .card {
    padding: var(--spacing-md);
  }

  .cardHeader {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .datesContainer {
    flex-direction: row;
    gap: var(--spacing-md);
    margin-left: auto;
  }

  .dateItem {
    flex-direction: column;
    align-items: flex-start;
    padding-right: var(--spacing-md);
  }

  .primaryStats {
    flex-direction: row;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
  }

  .secondaryStats {
    flex-direction: row;
    gap: var(--spacing-md);
    flex-wrap: wrap;
  }

  .statItem {
    width: 100px;
  }

  .growthIndicator {
    justify-content: flex-end;
  }

}
</style>