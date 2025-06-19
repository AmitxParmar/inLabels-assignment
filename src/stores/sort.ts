import { writable } from 'svelte/store'
import type { Note } from '../types/note'

export type SortOptions = {
  sortBy: keyof Note
  order: 'asc' | 'desc'
}

export const sortOptions = writable<SortOptions>({
  sortBy: 'createdAt',
  order: 'desc',
})
