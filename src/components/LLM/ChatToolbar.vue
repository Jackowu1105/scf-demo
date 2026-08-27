<script setup lang="ts">
// Icon imports
import { icons } from '@/constants/icons'
import { useThemeStore } from '@/stores/useThemeStore'

// Event emits
const emit = defineEmits<{
  (e: 'back'): void
}>()

const themeStore = useThemeStore()
</script>

<template>
  <div :class="[$style.toolbar, { [$style.darkMode]: themeStore.isDark }]">
    <!-- Left Section -->
    <div :class="$style.toolbarLeft">
      <button 
        :class="$style.toolbarBtn" 
        @click="emit('back')"
        aria-label="Go back"
      >
        <img :src="icons.back" alt="back" class="icon">
      </button>
      <div :class="$style.toolbarTitle">
        <h3 :class="'animate slide-y'">Ask SCF AI</h3>
      </div>
    </div>

    <!-- Right Section -->
    <div :class="$style.toolbarRight">
      <button 
        :class="$style.avatarBtn" 
        aria-label="Profile"
      >
        <img :src="icons.aiftLogo" alt="Profile" :class="$style.avatar">
      </button>
    </div>
  </div>
</template>

<style module>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  animation: slideDown var(--duration-300) var(--ease-in-out);
}

.toolbarLeft {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.toolbarBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.toolbarBtn:hover {
  background: var(--bg-hover);
}

.toolbarBtn img {
  width: 20px;
  height: 20px;
}

.toolbarTitle h3 {
  font-size: var(--font-size-xl);
  margin: 0;
  color: var(--text-primary);
  font-weight: 600;
}

.toolbarRight {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

/* Dark Mode Styles */
.darkMode {
  border-color: var(--border-dark);
}

.darkMode .toolbarTitle h3 {
  color: var(--text-light);
}

.darkMode .toolbarBtn {
  color: var(--text-light);
}

.darkMode .toolbarBtn:hover {
  background: var(--bg-dark-hover);
}

.darkMode .toolbarBtn img {
  filter: brightness(0) invert(0.8);
}

.darkMode .avatar {
  border: 1px solid var(--border-dark);
}

.darkMode .avatarBtn:hover {
  box-shadow: var(--shadow-dark);
  background: var(--bg-dark-tertiary);
}

.avatarBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatarBtn:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-sm);
}

/* Dark Mode Override */
.darkMode .avatarBtn:hover {
  box-shadow: var(--shadow-dark);
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  .toolbar {
    padding: 0 0 var(--spacing-md)  0;
  }

  .toolbarTitle h3 {
    font-size: var(--font-size-lg);
  }

  .toolbarBtn {
    width: 32px;
    height: 32px;
  }

  .toolbarBtn img {
    width: 18px;
    height: 18px;
  }

  .avatarBtn {
    width: 36px;
    height: 36px;
  }

  .avatar {
    width: 100%;
    height: 100%;
  }
}
</style>