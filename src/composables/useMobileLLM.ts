import { ref, onMounted, onUnmounted } from 'vue'

export function useMobileLLM() {
  const isLLMExpanded = ref(false)
  const isMobile = ref(window.innerWidth <= 768)

  const handleResize = () => {
    isMobile.value = window.innerWidth <= 768
  }

  const toggleLLM = () => {
    if (!isMobile.value) return
    isLLMExpanded.value = !isLLMExpanded.value
    document.body.style.overflow = isLLMExpanded.value ? 'hidden' : ''
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    isLLMExpanded,
    isMobile,
    toggleLLM
  }
}
