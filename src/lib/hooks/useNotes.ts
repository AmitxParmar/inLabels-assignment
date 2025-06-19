import {
  createQuery,
  createMutation,
  createInfiniteQuery,
  useQueryClient,
} from '@tanstack/svelte-query'
import type { Note } from '@/src/types/note'
import { NotesApi } from '$lib/noteApi'

type NotesResponse = {
  notes: Note[]
  page: number
  hasNextPage: boolean
}

export function useNotes(
  page = 1,
  limit = 20,
  search = '',
  sortBy = 'title',
  order = 'asc'
) {
  return createQuery<NotesResponse>({
    queryKey: ['notes', page, limit, search, sortBy, order],
    queryFn: () => NotesApi.getNotes(page, limit, search, sortBy, order),
  })
}

export function useInfiniteNotes(
  limit = 20,
  search = '',
  sortBy = 'title',
  order = 'asc'
) {
  return createInfiniteQuery<NotesResponse>({
    queryKey: ['notes', limit, search, sortBy, order],
    queryFn: ({ pageParam = 1 }) =>
      NotesApi.getNotes(Number(pageParam), limit, search, sortBy, order),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 30000, // 30 seconds debounce
    gcTime: 5 * 60 * 1000, // 5 minutes cache time
  })
}

export function useCreateNote() {
  const queryClient = useQueryClient()
  return createMutation<Note, Error, Note>({
    mutationFn: (noteData) => NotesApi.createNote(noteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}

export function useUpdateNote() {
  const queryClient = useQueryClient()
  return createMutation<Note, Error, { id: string; data: Note }>({
    mutationFn: ({ id, data }) => NotesApi.updateNote(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}

export function useDeleteNote() {
  const queryClient = useQueryClient()
  return createMutation<boolean, Error, string>({
    mutationFn: (id) => NotesApi.deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}
