<script setup lang="ts">
import { ref } from 'vue'
import { useAssetManagement } from '@/composables/useAssetManagement'
import { useMobileLLM } from '@/composables/useMobileLLM'
import type { SortKey } from '@/types/asset'
import { initialAssets } from '@/constants/assetData'
import LLM from '@/components/LLM.vue'
import AssetCard from '@/components/AssetList/AssetCard.vue'
import AssetListHeader from '@/components/Header.vue'
import AssetListSortFilter from '@/components/AssetList/AssetListSortFilter.vue'

// Asset management logic
const { sortedAssets, updateSortKey } = useAssetManagement(initialAssets)
const { isLLMExpanded, isMobile, toggleLLM } = useMobileLLM()
const currentSortKey = ref<SortKey>('updateDate')

// Event handlers
const handleAssetClick = (assetId: string) => {
  console.log('Asset clicked:', assetId)
}

const handleTitleClick = () => {
  console.log('Title clicked')
}

const handleFilterChange = (value: string) => {
  currentSortKey.value = value as SortKey
  updateSortKey(value as SortKey)
}
</script>

<template>
  <div class="asset-view">
    <div class="asset-list">
      <div class="header-container">
        <AssetListHeader 
          title="资产列表"
          @titleClick="handleTitleClick" 
        />
        <AssetListSortFilter 
          v-model="currentSortKey"
          @filterChange="handleFilterChange"
        />
      </div>
      <div class="card-container">
        <AssetCard
          v-for="asset in sortedAssets"
          :key="asset.assetId"
          v-bind="asset"
          @click="() => handleAssetClick(asset.assetId)"
        />
      </div>
    </div>
    <div :class="['llm-sectionbtn', { 'expanded': isLLMExpanded }]">
      <template v-if="!isMobile">
        <div class="desktop-llm">
          <LLM width="100%" height="100%" />
        </div>
      </template>
      <template v-else>
        <template v-if="isLLMExpanded">
          <button class="close-button" @click.stop="toggleLLM">
            <span class="close-icon"></span>
          </button>
          <div class="mobile-llm">
            <LLM width="100%" height="100%" />
          </div>
        </template>
        <button v-else class="llm-button" @click.stop="toggleLLM">
          <span class="chat-icon"></span>
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* Layout */
.asset-view {
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  gap: var(--spacing-md);
  animation: fade var(--duration-500) var(--ease-out);
  color: var(--text-primary);
  overflow: hidden;
}

/* Asset List Section */
.asset-list {
  flex: 1;
  width: 50%;
  height: calc(100vh - 20px); /* Subtract some height */
  max-height: 100vh;
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-gutter: stable;
  padding-right: var(--spacing-sm);
  padding-bottom: var(--spacing-2xl); /* Add bottom padding */
  animation: slide-x var(--duration-500) var(--ease-out);
  --slide-start: -30px;
  -webkit-overflow-scrolling: touch;
}

/* Header */
.header-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  position: sticky;
  top: 0;
  z-index: 1;
  backdrop-filter: blur(25px);
  animation: slide-y var(--duration-300) var(--ease-out);
  --slide-start: -20px;
  transition: transform var(--duration-200) var(--ease-out);
}

/* Card Container */
.card-container {
  width: 100%;
  display: grid;
  gap: var(--spacing-md);
  animation: fade var(--duration-500) var(--ease-out);
  animation-delay: var(--duration-200);
  padding-bottom: var(--spacing-lg); /* Add padding to the bottom */
}

@media screen and (min-width: 769px) {
  .card-container {
    padding-bottom: var(--spacing-3xl); /* Add more padding to the bottom in desktop mode */
  }
}

/* LLM Section - Desktop */
.llm-section {
  flex: 1;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.desktop-llm {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* Mobile LLM Section */
.mobile-llm {
  width: 100%;
  height: 100%; /* 设置高度为100% */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: var(--spacing-xl) 0;
}

/* Interactions & Animations */
.header-container:hover {
  transform: translateY(2px);
}

.card-container > * {
  animation: scale var(--duration-300) var(--ease-out);
  animation-fill-mode: both;
  transition: all var(--duration-200) var(--ease-out);
  border: 1px solid var(--border-color);
}

.card-container > *:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-light);
}

/* Staggered animations for cards */
.card-container > *:nth-child(1) { animation-delay: var(--duration-75); }
.card-container > *:nth-child(2) { animation-delay: calc(var(--duration-75) * 2); }
.card-container > *:nth-child(3) { animation-delay: calc(var(--duration-75) * 3); }
.card-container > *:nth-child(4) { animation-delay: calc(var(--duration-75) * 4); }
.card-container > *:nth-child(5) { animation-delay: calc(var(--duration-75) * 5); }

/* Scrollbar Styles */
.asset-list::-webkit-scrollbar {
  width: 8px;
}

.asset-list::-webkit-scrollbar-track {
  background: var(--bg-base);
}

.asset-list::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb);
  border-radius: 4px;
}

.asset-list::-webkit-scrollbar-thumb:hover {
  background-color: var(--scrollbar-thumb-hover);
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
  .asset-view {
    flex-direction: column;
    gap: var(--spacing-sm);
    padding-bottom: 80px;
    overflow-y: auto;
  }

  .asset-list {
    width: 100%;
    height: auto;
    min-height: unset;
    padding-right: 0;
    overflow-y: visible;
  }

  .header-container {
    z-index: 100;
    padding: 0 0 var(--spacing-md) 0;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    border-bottom: 1px solid var(--border-color);
    backdrop-filter: blur(25px);
    gap: var(--spacing-sm);
  }

  .desktop-llm {
    display: none;
  }

  .llm-sectionbtn {
    position: fixed;
    bottom: var(--spacing-3xl);
    right: var(--spacing-lg);
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--gradient-primary);
    box-shadow: var(--shadow-lg);
    z-index: 9999;
    cursor: pointer;
    transform: translateY(15%);
    opacity: 1;
    transition: transform var(--duration-300) var(--ease-out), opacity var(--duration-300) var(--ease-out);
    
  }

  .llm-sectionbtn.expanded {
    width: 100%;
    height: calc(100dvh - 40px); /* Changed from 100vh */
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0;
    background: none;
    z-index: 10000;
    overflow-y: auto;
    padding: var(--spacing-xl);
    backdrop-filter: blur(25px); 
    display: flex;
    flex-direction: column; /* 垂直排列 */
    transform: translateY(100%);
    opacity: 0;
    transition: transform var(--duration-300) var(--ease-out), opacity var(--duration-300) var(--ease-out);
  }

  .llm-sectionbtn.expanded {
    transform: translateY(0);
    opacity: 1;
  }

  .llm-button {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
  }

  .llm-sectionbtn.expanded .llm-button {
    display: none; /* 隐藏llm-button */
  }

  .chat-icon {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/icon/llmIcon.svg') no-repeat center;
    background-size: contain;
    filter: brightness(0) invert(1);
  }

  .llm-section.expanded .chat-icon {
    display: none; 
  }

  .close-button {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    cursor: pointer;
    z-index: 10001;
  }

  .close-icon {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }

  .close-icon::before,
  .close-icon::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 2px;
    background: var(--text-primary);
    transform-origin: center;
  }

  .close-icon::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .close-icon::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}

/* Desktop Styles */
@media screen and (min-width: 769px) {
  .llm-sectionbtn {
    width: 50%; /* 设置桌面版本宽度为50% */
    height: 100%;
    position: relative;
    bottom: auto;
    right: auto;
    border-radius: 0;
    background: none;
    box-shadow: none;
    cursor: default;
    transform-origin: center;
  }

  .llm-sectionbtn.expanded {
    width: 50%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0;
    background: none;
    z-index: 10000;
    overflow-y: auto;
    padding: var(--spacing-xl);
    backdrop-filter: blur(25px); 
  }
}

/* Small Mobile & Landscape Mode Adjustments */
@media screen and (max-width: 480px) {
  .llm-section {
    bottom: var(--spacing-md);
    right: var(--spacing-md);
    width: 48px;
    height: 48px;
  }

  .asset-view {
    padding-bottom: 64px;
  }
}

/* Touch Device Optimizations */
@media (hover: none) {
  .header-container:hover,
  .card-container > *:hover,
  .asset-list-filter:hover {
    transform: none;
  }

  .card-container > *:hover {
    box-shadow: var(--shadow-md);
  }
}
</style>