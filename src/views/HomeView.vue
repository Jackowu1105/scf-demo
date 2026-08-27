<script setup lang="ts">
import { ref } from 'vue'
import LLM from '../components/LLM.vue'

const isExpanded = ref(false)

const handleChatStart = () => {
  isExpanded.value = true
}

const handleBack = () => {
  isExpanded.value = false
}
</script>

<template>
  <div class="home-container">
    <div :class="['chat-wrapper', { expanded: isExpanded }]">
      <LLM 
        @chat-start="handleChatStart"
        @back="handleBack"
      />
    </div>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  padding: 1rem;
}

.chat-wrapper {
  width: 75%;
  max-width: 1200px;
  height: fit-content;
  max-height: 800px;
  display: flex;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border-radius: var(--radius-lg);
  margin: auto;
}

.chat-wrapper.expanded {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border-radius: 0;
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  .home-container {
    padding: 0;
  }

  .chat-wrapper {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border-radius: 0;
    padding: var(--spacing-md) var(--spacing-sm);
  }

  .chat-wrapper.expanded {
    top: 0;
    left: 0;
    height: 100vh;
    padding: 0;
    margin: 0;
    border-radius: 0;
    z-index: 1000;
  }
}

/* Tablet Styles */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .home-container {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chat-wrapper {
    width: 85%;
    max-height: 90vh;
    border-radius: var(--radius-md);
  }

  .chat-wrapper.expanded {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border-radius: 0;
  }
}

/* Ensure proper display on landscape mode */
@media screen and (max-width: 768px) and (orientation: landscape) {
  .chat-wrapper {
    height: auto;
  }
}

/* Handle smaller height screens */
@media screen and (max-height: 600px) {
  .chat-wrapper {
    max-height: calc(100vh - 2rem);
  }
}
</style>
