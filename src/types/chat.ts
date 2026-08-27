export interface Message {
  id: number
  text: string
  type: 'user' | 'bot'
  timestamp: Date
}

export interface ChatProps {
  width?: string | number
  height?: string | number
  maxWidth?: string | number
}