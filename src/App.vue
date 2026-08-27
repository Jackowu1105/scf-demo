<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import bgImage from '@/assets/images/bg.jpg'
import { useThemeStore } from '@/stores/useThemeStore'
import { onMounted, ref } from 'vue'
// import '@/assets/styles/theme.css'


const themeStore = useThemeStore()
const isMobileMenuOpen = ref(false)

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <div 
    :class="[
      'app', 
      { 
        'dark-mode': themeStore.isDark,
        'blur-background': isMobileMenuOpen 
      }
    ]" 
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="NavBar">
      <NavBar v-model:isMobileMenuOpen="isMobileMenuOpen" />
    </div>
    <main class="content">
      <div class="main-content">
        <RouterView />
      </div>
      <footer class="footer">
        <span>AIFT</span>
        <span>®2025 人工智能金融科技實驗室出品</span>
      </footer>
    </main>
  </div>
</template>

<style scoped>
/* Base styles */
.app {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  overflow: hidden;
  background-color: var(--bg-base);
  color: var(--text-primary);
  transition: all var(--duration-300) var(--ease-out);
}

/* Dark mode styles */
.app.dark-mode {
  background-color: var(--bg-dark);
  color: var(--text-primary);
}

.app.dark-mode::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-dark);
  pointer-events: none;
  z-index: 0;
}

/* Layout components */
.NavBar {
  width: var(--sidebar-width);
  height: 100vh;
  flex-shrink: 0;
  backdrop-filter: blur(25px); /* 设置背景模糊为 25px */
  background-color: transparent; /* 设置背景颜色为透明 */
  z-index: 1;
}

.app.dark-mode .NavBar {
  backdrop-filter: blur(25px); /* Dark mode 时设置背景模糊为 25px */
  background-color: transparent; /* Dark mode 时设置背景颜色为透明 */
}

.content {
  position: relative;
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1;
}

.main-content {
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: var(--spacing-lg);
  box-sizing: border-box;
}

/* Footer styles */
.footer {
  flex-shrink: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--spacing-lg) var(--spacing-lg);
  font-size: var(--font-size-xs);
  color: var(--text-primary);
  transition: color var(--duration-300) var(--ease-out);
}

.app.dark-mode .footer {
  color: var(--text-primary);
  backdrop-filter: blur(25px);
  background-color: var(--bg-dark);
}

/* Mobile Layout Styles */
@media screen and (max-width: 768px) {
  .app {
    flex-direction: column;
    height: 100dvh; /* Changed from 100vh */
    overflow-x: hidden;
  }

  .NavBar {
    width: 100%;
    height: 40px; /* Fixed height for mobile header */
    min-height: auto;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100; /* Increase z-index to ensure it's above other elements */
    pointer-events: auto; /* Enable pointer events */
    backdrop-filter: blur(25px);
  }

  .content {
    margin-top: 40px; /* Match navbar height */
    height: calc(100dvh - 40px); /* Changed from 100vh */
    width: 100%;
    z-index: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .main-content {
    min-height: calc(100dvh - 40px - 80px); /* Changed from 100vh */
    padding: var(--spacing-md);
  }

  .footer {
    position: relative;
    padding: var(--spacing-sm) var(--spacing-md);
    z-index: 1;
  }

  /* Content blur effect when mobile menu is open */
  .app.blur-background .content,
  .app.blur-background .footer {
    filter: blur(25px);
    transition: filter 0.3s ease;
  }
}

/* Dark mode mobile adjustments */
@media screen and (max-width: 768px) {
  .app.dark-mode .NavBar {
    backdrop-filter: blur(25px);
  }

  .app.dark-mode .footer {
    backdrop-filter: blur(25px);
  }
}
</style>
