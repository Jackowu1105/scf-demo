<script setup lang="ts">
import { useThemeStore } from '@/stores/useThemeStore'
import type { Message } from '@/types/chat'

defineProps<{
  message: Message
}>()

const themeStore = useThemeStore()
</script>

<template>
  <div :class="[$style.message, $style[message.type], { [$style.darkMode]: themeStore.isDark }]">
    {{ message.text }}
  </div>
</template>

<style module>


.message {
  max-width: 80%;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  transition: all 0.3s ease;
}

.user {
  align-self: flex-end;
  background: var(--gradient-primary);
  color: var(--bg-white);
}

.bot {
  align-self: flex-start;
  background: var(--bg-light);
  color: var(--text-primary);
}

.darkMode.bot {
  background: var(--bg-dark);
  color: var(--text-light);
}

</style>