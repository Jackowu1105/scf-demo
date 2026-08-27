<script setup lang="ts">
interface Props {
  title?: string
}

interface EmitEvents {
  (e: 'titleClick'): void
}

withDefaults(defineProps<Props>(), {
  title: '资产列表'
})

const emit = defineEmits<EmitEvents>()

const onTitleClick = () => {
  emit('titleClick')
}

import { useThemeStore } from '@/stores/useThemeStore'

const themeStore = useThemeStore()
</script>

<template>
  <header :class="[$style.header, { [$style.darkMode]: themeStore.isDark }]">
    <div :class="$style.titleBox">
      <h1 :class="$style.title" @click="onTitleClick">{{ title }}</h1>
    </div>
  </header>
</template>

<style module>
.header {
  width: 100%;
  display: flex;
  align-items: center;
}

.titleBox {
  flex: 1;
  background-color: var(--bg-white);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
}

.title {
  margin: 0;
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title:hover {
  color: var(--primary-color);
}

.darkMode .titleBox {
  background-color: var(--bg-dark-secondary);
  border-color: var(--border-dark);
}

.darkMode .title {
  color: var(--text-light);
}

.darkMode .title:hover {
  color: var(--primary-light);
}
</style>