<script setup lang="ts">
import { ref } from 'vue'
import type { Message, ChatProps } from '@/types/chat'
import { defaultQuestions } from '@/data/questions'
import ChatMessage from './LLM/ChatMessage.vue'
import ChatToolbar from './LLM/ChatToolbar.vue'
import InputSection from './LLM/InputSection.vue'
import { useThemeStore } from '@/stores/useThemeStore'

// Props
withDefaults(defineProps<ChatProps>(), {
  width: 'auto',
  height: 'auto',
  minWidth: '977px'
})

const emit = defineEmits<{
  (e: 'chat-start'): void
  (e: 'back'): void
}>()

// State
const messages = ref<Message[]>([])
const inputMessage = ref('')
const isLoading = ref(false)
const themeStore = useThemeStore()

// Methods
const sendMessage = async (text: string) => {
  if (!text.trim()) return
  
  if (messages.value.length === 0) {
    emit('chat-start')
  }
  
  messages.value.push({
    id: Date.now(),
    text: text.trim(),
    type: 'user',
    timestamp: new Date()
  })
  
  inputMessage.value = ''
  isLoading.value = true
  
  try {
    const response = await simulateApiCall(text)
    messages.value.push({
      id: Date.now(),
      text: response,
      type: 'bot',
      timestamp: new Date()
    })
  } catch (error) {
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
}

const simulateApiCall = async (text: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return `這是對「${text}」的模擬回應`
}

const handleQuestionClick = (question: string) => {
  emit('chat-start')
  sendMessage(question)
}

const handleBack = () => {
  messages.value = []
  inputMessage.value = ''
  emit('back')
}
</script>

<template>
  <div :class="[$style.llmContainer, { [$style.darkMode]: themeStore.isDark }]">
    <div :class="$style.content">
      <!-- Welcome Screen or Toolbar -->
      <template v-if="messages.length === 0">
        <div :class="[$style.header, 'animate fade-in']">
          <img :class="$style.logo" alt="AIFT Logo" src="@/assets/images/AIFT Logo.png" />
          <h1 :class="[$style.title, 'animate slide-y delay-1']">Ask SCF AI</h1>
          <h3 :class="[$style.subtitle, 'animate slide-y delay-2']">Try these question to get started</h3>
        </div>
      </template>
      <template v-else>
        <ChatToolbar @back="handleBack" />
      </template>

      <!-- Chat Area -->
      <div :class="[$style.chatArea, $style.scrollContainer]">
        <div :class="$style.messagesContainer">
          <ChatMessage 
            v-for="message in messages" 
            :key="message.id"
            :message="message"
          />
          <div v-if="isLoading" :class="$style.loading">
            <span :class="$style.dot" v-for="i in 3" :key="i" />
          </div>
        </div>
        
        <!-- Quick Questions -->
        <div v-if="messages.length === 0" :class="$style.questionsGrid">
          <button 
            v-for="(question, index) in defaultQuestions" 
            :key="index"
            :class="$style.questionButton"
            @click="handleQuestionClick(question.text)"
          >
            {{ question.text }}
          </button>
        </div>
      </div>

      <!-- Input Section -->
      <InputSection
        v-model:inputMessage="inputMessage"
        @send="sendMessage(inputMessage)"
      />
    </div>
  </div>
</template>

<style module>
/* Container styles */
.llmContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: var(--bg-base);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  margin: 0 auto;
  overflow: hidden;
}

.content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--spacing-lg);
}

/* Header Styles */

.logo {
  width: 100px;
  height: auto;
  
}

.header {
  text-align: center;
}

.title {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--primary-color);
}

.subtitle {
  font-size: var(--font-size-lg);
  font-weight: 400;
  color: var(--text-secondary);
}

/* Chat Area Styles */
.chatArea {
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: var(--spacing-md);
}

.messagesContainer {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

/* Message Styles */
.message {
  max-width: 100%;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  animation: messageSlide var(--duration-300) var(--ease-in-out);
  transition: all 0.2s ease;
}

.message.user {
  align-self: flex-end;
  background-color: var(--primary-color);
  color: var(--bg-white);
  transform-origin: bottom right;
}

.message.bot {
  align-self: flex-start;
  background-color: var(--bg-light);
  color: var(--text-primary);
  transform-origin: bottom left;
}

/* Loading Animation */
.loading {
  display: flex;
  gap: 4px;
  padding: var(--spacing-sm);
  animation: fadeIn var(--duration-300) var(--ease-in);
  align-self: flex-start;
  border-radius: var(--radius-lg);
  background: var (--bg-light);
  margin-left: var(--spacing-md);
}

.dot {
  width: 8px;
  height: 8px;
  background-color: var(--primary-color);
  border-radius: 50%;
  animation: bounce 1.4s infinite var(--ease-in-out);
  opacity: 0.7;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

/* Question Button Styles */
.questionsGrid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  width: 100%;
  padding: var(--spacing-lg) 0;
}

.questionButton {
  flex: 1 1 100%;
  min-width: 220px;
  max-width: calc(25% - var(--spacing-md));
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-light);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s var(--ease-out);
  text-align: left;
  line-height: 1.4;
  animation: questionFade var(--duration-500) var(--ease-out);
  animation-fill-mode: both;
}

/* Add stagger effect to buttons */
.questionButton:nth-child(1) { animation-delay: 100ms; }
.questionButton:nth-child(2) { animation-delay: 200ms; }
.questionButton:nth-child(3) { animation-delay: 300ms; }
.questionButton:nth-child(4) { animation-delay: 400ms; }

.questionButton:hover {
  background: var(--bg-hover);
  border-color: var(--primary-color);
  transform: translateY(-2px) scale(1.02);
  box-shadow: var(--shadow-md);
}

/* Add new animation keyframes */
@keyframes questionFade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {

  .logo {
    width: 60px;
    height: auto;
  }

  .title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--primary-color);
}

.subtitle {
  font-size: var(--font-size-md);
  font-weight: 400;
  color: var(--text-secondary);
}

  .questionButton {
    flex: 1 1 calc(50% - var(--spacing-md));
    max-width: calc(50% - var(--spacing-md));
  }

  .chatArea {
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: var(--spacing-sm) 0;
}

.questionsGrid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  width: 100%;
  padding: var(--spacing-md) 0;
}


}

/* Small Mobile Styles */
@media screen and (max-width: 480px) {
  .questionButton {
    flex: 1 1 100%;
    max-width: 100%;
  }
}

/* Dark Mode Styles */
.darkMode {
  background: var(--bg-dark-secondary);
  border-color: var(--border-dark);
}

.darkMode .message.user {
  background-color: var(--primary-light);
  color: var(--bg-dark);
}

.darkMode .message.bot {
  background-color: var(--bg-dark);
  color: var(--text-light);
  border: 1px solid var(--border-light);
}

.darkMode .loading {
  background: var(--bg-dark-hover);
  border: 1px solid var(--border-dark);
}

.darkMode .dot {
  background-color: var(--primary-light);
  opacity: 0.7;
}

.darkMode .questionButton {
  background: var(--bg-dark);
  border-color: var(--border-dark);
  color: var(--text-light);
}

.darkMode .questionButton:hover {
  background: var(--bg-dark-hover);
  border-color: var(--primary-light);
}

.darkMode .title,
.darkMode .subtitle {
  color: var(--text-light);
}

/* Animations */
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes messageSlide {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>