<script setup lang="ts">
import { icons } from '@/constants/icons'
import { useThemeStore } from '@/stores/useThemeStore'

interface Props {
  inputMessage: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:inputMessage', value: string): void
  (e: 'send'): void
  (e: 'attachFile'): void
  (e: 'toggleVoice'): void
}>()

const themeStore = useThemeStore()

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    emit('send')
  }
}
</script>

<template>
  <div :class="[$style.inputSection, { [$style.darkMode]: themeStore.isDark }]">
    <div :class="$style.inputWrapper">
      <!-- Action Buttons -->
      <button 
        :class="$style.actionBtn"
        @click="emit('attachFile')"
      >
        <img :src="icons.attachment" alt="attach file" />
      </button>
      
      <!-- Input Field -->
      <input
        :value="inputMessage"
        :class="$style.chatInput"
        type="text"
        placeholder="輸入訊息..."
        @input="e => emit('update:inputMessage', (e.target as HTMLInputElement).value)"
        @keydown="handleKeydown"
      />
      <button 
        :class="$style.actionBtn"
        @click="emit('toggleVoice')"
      >
        <img :src="icons.microphone" alt="voice input" />
      </button>

      <!-- Send Button -->
      <button 
        :class="$style.sendBtn"
        :disabled="!inputMessage.trim()"
        @click="emit('send')"
      >
        <img :src="icons.send" alt="send" />
      </button>
    </div>
  </div>
</template>

<style module>
.inputSection {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--spacing-md);
  border-top: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.inputWrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  border-radius: var(--radius-lg);
  padding: var(--spacing-sm) var(--spacing-md);
  transition: all 0.3s ease;
  background: var(--bg-light);
}

.chatInput {
  flex: 1;
  width: 100%;
  border: none;
  background: transparent;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  outline: none;
}

.chatInput::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}

.sendBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: var(--radius-md);
  background: var(--primary-color);
  cursor: pointer;
  transition: all 0.2s ease;
  padding: var(--spacing-sm);
}

.sendBtn:hover:not(:disabled) {
  transform: scale(1.05);
  background: var(--primary-dark);
}

.sendBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sendBtn img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

/* Dark Mode Styles */
.darkMode {
  background: none;
  border-color: var(--border-dark);
}

.darkMode .inputWrapper {
  background: var(--bg-dark);
}

.darkMode .inputWrapper:focus-within {
  background: var(--bg-dark-tertiary);
  box-shadow: 0 0 0 2px var(--primary-light);
}

.darkMode .chatInput {
  color: var(--text-light);
}

.darkMode .chatInput::placeholder {
  color: var(--text-light);
  opacity: 0.5;
}

.darkMode .sendBtn {
  background: var(--primary-light);
}

.darkMode .sendBtn:hover:not(:disabled) {
  background: var(--primary-light);
  transform: scale(1.05);
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.3);
}

.darkMode .actionBtn {
  opacity: 0.6;
}

.darkMode .actionBtn img {
  filter: brightness(0) invert(0.8);
}

.darkMode .actionBtn:hover {
  opacity: 1;
  background: var(--bg-dark-hover);
  border-radius: var(--radius-sm);
}

.actionBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: var(--spacing-xs);
  opacity: 0.7;
}

.actionBtn:hover {
  opacity: 1;
  transform: scale(1.05);
}

.actionBtn img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Dark Mode Styles */
.darkMode .actionBtn img {
  filter: brightness(0) invert(0.8);
}

.darkMode .actionBtn:hover {
  filter: brightness(1.2);
  background: var(--bg-dark-hover);
  border-radius: var(--radius-sm);
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  .inputSection {
    padding: var(--spacing-md) 0 0 0;
  }


}
</style>