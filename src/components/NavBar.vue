<script setup lang="ts">
// Types
interface NavItem {
  path: string
  text: string
  icon: string
}

// Imports
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { icons } from '@/constants/icons'
import { useThemeStore } from '@/stores/useThemeStore'

// Emit the mobile menu state to parent
const emit = defineEmits(['update:isMobileMenuOpen'])

// Store
const themeStore = useThemeStore()

// Navigation Data
const navItems: NavItem[] = [
  { path: '/', text: '首頁', icon: icons.home },
  { path: '/asset-list', text: '资产列表', icon: icons.assetList },
  { path: '/asset-calculator', text: '资产測算', icon: icons.assetCalculator }
]

// State & Methods
const isMobileMenuOpen = ref(false)

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
  emit('update:isMobileMenuOpen', isMobileMenuOpen.value)
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
  emit('update:isMobileMenuOpen', isMobileMenuOpen.value)
}
</script>

<template>
  <div :class="[
    { 
      [$style.darkMode]: themeStore.isDark,
      [$style.mobileMenuOpen]: isMobileMenuOpen 
    }
  ]">
    <!-- Mobile Burger Menu -->
    <button 
      :class="$style.burgerMenu" 
      @click="toggleMobileMenu"
      :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
    >
      <img 
        :src="isMobileMenuOpen ? icons.close : icons.burgerMenu" 
        :alt="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
        :class="[$style.menuIcon, $style.iconSize, $style.iconColor]"
      />
    </button>

    <!-- Mobile Navigation Content -->
    <div :class="[$style.mobileNavContent, { [$style.show]: isMobileMenuOpen }]">
      <!-- Logo Section -->
      <header :class="$style.headerSection">
        <div :class="$style.logoWrapper">
          <img :class="$style.logo" alt="AIFT Logo" :src="icons.aiftLogo" />
        </div>
        <img :class="$style.divider" alt="divider" :src="icons.line" />
      </header>

      <!-- Navigation Section -->
      <nav :class="$style.navSection">
        <div :class="$style.navLinks">
          <RouterLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path" 
            :class="$style.navLink"
            @click.native="closeMobileMenu"
          >
            <div :class="$style.linkContent">
              <div :class="$style.iconWrapper">
                <img :class="$style.icon" :alt="item.text" :src="item.icon" />
              </div>
              <span :class="$style.linkText">{{ item.text }}</span>
            </div>
          </RouterLink>
        </div>
      </nav>

      <!-- Footer Section -->
      <footer :class="$style.footerSection">
        <div :class="$style.userSection">
          <div :class="$style.userInfo">
            <!-- User Profile -->
            <div :class="$style.userProfile">
              <img :class="$style.avatar" alt="user" :src="icons.user" />
              <span :class="$style.username">Jacko</span>
            </div>

            <!-- Control Buttons -->
            <div :class="$style.userControls">
              <button 
                :class="$style.themeToggle" 
                @click="toggleTheme"
                :title="themeStore.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
              >
                <img 
                  :class="$style.themeIcon" 
                  :src="themeStore.isDark ? icons.sun : icons.moon" 
                  :alt="themeStore.isDark ? 'Light mode' : 'Dark mode'"
                />
              </button>
              <button :class="$style.settingsIcon" title="Settings">
                <img 
                  :class="$style.userSettingsIcon" 
                  alt="settings" 
                  :src="icons.userSettings" 
                />
              </button>
            </div>
          </div>
          <button :class="$style.logoutButton">登出</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<style module>
.mobileNavContent {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  padding: var(--spacing-xl) 0  var(--spacing-md) var(--spacing-md);
  transition: transform 0.3s ease;
  z-index: 999;
  display: flex;
  flex-direction: column;
}

.darkMode {
  color: var(--text-light);
}

/* Header & Logo 樣式
----------------------------------------*/
.headerSection {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-md) 0;
}

.logoWrapper {
  width: 100%;
  height: 80px;
  position: relative;
  margin: 0 auto;
  margin-bottom: var(--spacing-md);
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.divider {
  width: 100%;
  height: 1px;
  margin: var(--spacing-md) 0;
}

/* 導航區域樣式 
----------------------------------------*/
.navSection {
  flex: 1;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  overflow-y: auto;
  padding: var(--spacing-sm);
}

.navLinks {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

/* 導航鏈接樣式 
----------------------------------------*/
.navLink {
  width: 100%;
  height: 48px;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  background: var(--bg-white);
}

.linkContent {
  height: 100%;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.linkText {
  font-size: var(--font-size-md);
  line-height: var(--line-height-normal);
  font-family: var(--font-family);
}

/* 導航圖標樣式 
----------------------------------------*/
.iconWrapper {
  width: 32px;
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--gradient-primary);
  transition: all 0.3s ease-in;
}

.icon {
  width: 16px;
  height: 16px;
  filter: brightness(0) invert(1);
}

/* 用戶區域樣式 
----------------------------------------*/
.userSection {
  width: 100%;
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  background: var(--gradient-primary);
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-top: auto;
}

.userInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.userProfile {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
}

.username {
  color: var(--bg-white);
  font-size: var(--font-size-md);
  font-weight: 500;
}

/* 控制按鈕樣式 
----------------------------------------*/
.userControls {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.themeToggle,
.settingsIcon {
  width: 32px;
  height: 32px;
  padding: var(--spacing-sm);
  border: none;
  border-radius: var(--radius-md);
  background: var(--bg-white);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.themeIcon,
.userSettingsIcon {
  width: 16px;
  height: 16px;
  filter: invert(47%) sepia(82%) saturate(1162%) hue-rotate(183deg) brightness(101%) contrast(96%);
}

.logoutButton {
  width: 100%;
  height: 32px;
  border: none;
  font-weight: 800;
  border-radius: var(--radius-md);
  background-color: var(--bg-white);
  color: var(--primary-color);
  font-size: var(--font-size-sm);
  cursor: pointer;
}

/* 狀態樣式 
----------------------------------------*/
.navLink:hover,
.navLink:global(.router-link-active) {
  background: var(--gradient-primary);
  color: var(--bg-white);
}

.navLink:hover .iconWrapper,
.navLink:global(.router-link-active) .iconWrapper {
  background: var(--bg-white);
}

.navLink:hover .icon,
.navLink:global(.router-link-active) .icon {
  filter: none;
}

/* 深色模式樣式 
----------------------------------------*/
.darkMode .navLink {
  background: var(--bg-dark-secondary);
  color: var(--text-light);
}

.darkMode .iconWrapper {
  background: var(--bg-dark-secondary);
}

.darkMode .userSection {
  background: var(--gradient-primary);
  color: var(--text-light);
}

.darkMode .settingsIcon,
.darkMode .themeToggle,
.darkMode .logoutButton {
  background: var(--bg-dark-secondary);
  color: var(--text-light);
}

.darkMode .userSettingsIcon,
.darkMode .themeIcon {
  filter: invert(100%);
}

/* 漢堡菜單樣式 */
.burgerMenu {
  display: none;
  position: absolute;
  top: 14px;
  left: 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 1001;
  padding: 0;
}

.menuIcon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  .burgerMenu {
    display: block;
  }

  .mobileNavContent {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    padding-top: 60px;
    padding-left: var(--spacing-sm);
    padding-right: var(--spacing-sm);
    padding-bottom: var(--spacing-lg);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 999;
    display: flex;
    flex-direction: column;
  }

  .navSection {
    flex: 1;
    width: 100%;
    height: 100dvh;
    display: flex;
    overflow-y: auto;
  }

  .footerSection {
    width: 100%;
    padding: var(--spacing-md);
  }

  .darkMode .mobileNavContent {
    background: none;
  }

  .show {
    transform: translateX(0);
  }

  .navLinks {
     width: 100%;
     display: flex;
     flex-direction: column;
     gap: var(--spacing-md);
     padding: var(--spacing-sm);
}

  .mobileMenuOpen .mobileNavContent {
    transform: translateX(0);
  }

  .show {
    transform: translateX(0) !important;
  }

  .navSection {
    height: 100dvh;
    min-height: calc(100dvh - 60px - 120px); /* Account for header and footer */
    align-items: center;
    display: flex;
    flex-direction: column;
  
    overflow-y: auto;
  }

  .userSection {
    width: 100%;
    position: fixed;
    bottom: var(--spacing-md);
    left: var(--spacing-md);
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    background: var(--gradient-primary);
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    margin-top: auto;
}

 

  .darkMode .mobileNavContent {
    background: none;
  }

  /* Ensure menu is scrollable */
  .mobileNavContent {
    -webkit-overflow-scrolling: touch;
  }

  /* Logo adjustments for mobile */
  .logoWrapper {
    width: 100%;
    height: 80px;
    position: relative;
    margin: 0 auto;
    margin-bottom: var(--spacing-sm);
  }

  /* Overlay Effect */
  .mobileMenuOpen::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
  
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 998;
    transition: all 0.3s ease;
  }

  .darkMode.mobileMenuOpen::before {
    background: none;
  }
}

.headerSection {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:  0;
}

/* Update mobile styles */
@media screen and (max-width: 768px) {
  .headerSection {
    padding:  0;
  }
}

/* Footer 樣式 
----------------------------------------*/
.footerSection {
  transition: all 0.3s ease;
}

.footerSection:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

/* Add to mobile styles section */
@media screen and (max-width: 768px) {
  .footerSection {
    position: sticky;
    bottom: 0;
    margin: 0;
    border-radius: var (--radius-lg) var(--radius-lg) 0 0;
    transform: none;
    box-shadow: var(--shadow-up);
  }

  .footerSection:hover {
    transform: none;
  }
}

@media screen and (min-width: 769px) {
  .footerSection {
    margin-top: auto;
  }
}

.iconSize {
  width: 20px;
  height: 20px;
}

.iconColor {
  filter: brightness(0) saturate(100%) invert(50%); /* 深灰色 */
}

.darkMode .iconColor {
  filter: brightness(0) saturate(100%) invert(50%); /* 浅灰色 */
}
</style>