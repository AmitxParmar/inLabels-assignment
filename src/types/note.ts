export type Note = {
  id?: string
  createdAt?: string
  name?: string
  avatar?: string
  title: string
  content: string
  color: '#F8F9FA' | '#FFF3BF' | '#D3F9D8' | '#FFE3E3' | '#E7F5FF' | '#F3F0F0'
  category?: 'work' | 'personal' | 'ideas'
  isPinned?: boolean
}
