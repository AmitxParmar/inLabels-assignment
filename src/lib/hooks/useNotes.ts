import {
  createQuery,
  createMutation,
  queryClient,
} from '@tanstack/svelte-query'
import { NotesApi } from '@/src/api/api' // adjust path
import type { Note } from '@/src/types/note'

export function useNotes(page = 1, limit = 20, search = '') {
  return createQuery(['notes', page, limit, search], () =>
    NotesApi.getNotes(page, limit, search)
  )
}

export function useCreateNote() {
  return createMutation({
    mutationFn: (noteData: Note) => NotesApi.createNote(noteData),
    onSuccess: () => {
      queryClient.invalidateQueries(['notes'])
    },
  })
}

export function useUpdateNote() {
  return createMutation({
    mutationFn: ({ id, data }: { id: string; data: Note }) =>
      NotesApi.updateNote(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['notes'])
    },
  })
}

export function useDeleteNote() {
  return createMutation({
    mutationFn: (id: string) => NotesApi.deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['notes'])
    },
  })
}
