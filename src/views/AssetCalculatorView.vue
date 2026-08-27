<script setup lang="ts">
import { useMobileLLM } from '@/composables/useMobileLLM'
import LLM from '@/components/LLM.vue'
import AssetListHeader from '@/components/Header.vue'
import AssetCalculatorCard from '@/components/AssetCalculator/AssetCalculatorCard.vue'

const { isLLMExpanded, isMobile, toggleLLM } = useMobileLLM()

const handleTitleClick = () => {
  console.log('Title clicked')
}
</script>

<template>
  <div class="asset-calculator-view">
    <div class="calculator-section">
      <div class="header-container">
        <AssetListHeader 
          title="资产测算"
          @titleClick="handleTitleClick" 
        />
      </div>
      <div class="content-container">
        <AssetCalculatorCard />
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
.asset-calculator-view {
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  gap: var(--spacing-md);
  animation: fade var(--duration-500) var(--ease-out);
  color: var(--text-primary);
}

/* Calculator Section */
.calculator-section {
  flex: 1;
  width: 50%;
  height: 100%;
  overflow: auto;
  scroll-behavior: smooth;
  animation: slide-x var(--duration-500) var (--ease-out);
  --slide-start: -30px;
  transition: transform var(--duration-200) var(--ease-out);
}

.desktop-llm {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* LLM Section - Desktop */
.llm-section {
  flex: 1;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  animation: slide-x var(--duration-500) var(--ease-out);
  --slide-start: 30px;
  transition: transform var(--duration-200) var(--ease-out);
}

.llm-section:hover {
  transform: scale(1.002);
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
  backdrop-filter: blur(8px);
  animation: slide-y var(--duration-300) var(--ease-out);
  --slide-start: -20px;
  transition: all var(--duration-200) var(--ease-out);
}

.header-container:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  background-color: var(--bg-hover);
}

/* Content Container */
.content-container {
  color: var(--text-primary);
  line-height: var(--line-height-normal);
  animation: scale var(--duration-300) var(--ease-out);
  --scale-start: 0.98;
  animation-delay: var(--duration-200);
  animation-fill-mode: both;
  transition: all var(--duration-200) var(--ease-out);
}

.content-container:hover {
  transform: translateY(-2px);
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

/* Scrollbar Styles */
.calculator-section::-webkit-scrollbar {
  width: 6px;
}

.calculator-section::-webkit-scrollbar-track {
  background: transparent;
}

.calculator-section::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb);
  border-radius: 3px;
  transition: background-color var(--duration-200) var (--ease-out);
}

.calculator-section::-webkit-scrollbar-thumb:hover {
  background-color: var(--scrollbar-thumb-hover);
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
  .asset-calculator-view {
    height: 100dvh;
    flex-direction: column;
    gap: var(--spacing-sm);
    padding-bottom: 80px;
    overflow-y: auto;
  }

  .calculator-section {
    width: 100%;
    height: 100%;
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

  .asset-calculator-view {
    padding-bottom: 64px;
  }
}

/* Touch Device Optimizations */
@media (hover: none) {
  .header-container:hover,
  .content-container:hover {
    transform: none;
  }

  .content-container:hover {
    box-shadow: var(--shadow-md);
  }
}
</style>
