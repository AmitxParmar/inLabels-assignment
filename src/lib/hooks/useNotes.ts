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

export function useNotes(page = 1, limit = 20, search = '') {
  return createQuery<NotesResponse>({
    queryKey: ['notes', page, limit, search],
    queryFn: () => NotesApi.getNotes(page, limit, search),
  })
}

export function useInfiniteNotes(limit = 20, search = '') {
  return createInfiniteQuery<NotesResponse>({
    queryKey: ['notes', limit, search],
    queryFn: ({ pageParam = 1 }) =>
      NotesApi.getNotes(Number(pageParam), limit, search),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
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
