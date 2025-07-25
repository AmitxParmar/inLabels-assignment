import type { Note } from '@/src/types/note'

const BASE_URL = 'https://684ed48bf0c9c9848d293c41.mockapi.io/api/v1'

interface GetNotesResponse {
  notes: Note[]
  page: number
  hasNextPage: boolean
}

export class NotesApi {
  /**
   * Fetch all notes with optional search and pagination
   */
  static async getNotes(
    page = 1,
    limit = 10,
    search = '',
    sortBy = 'createdAt',
    order = 'desc'
  ): Promise<GetNotesResponse> {
    try {
      let url = `${BASE_URL}/notes?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`

      if (search) {
        url += `&search=${encodeURIComponent(search)}`
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const notes = await response.json()
      console.log('notes received from api call', notes)
      return {
        notes,
        page,
        hasNextPage: notes.length === limit,
      }
    } catch (error) {
      console.error('Error fetching notes:', error)
      throw error
    }
  }
  /**
   * Create a new note
   */
  static async createNote(noteData: Note): Promise<Note> {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...noteData }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating note:', error)
      throw error
    }
  }

  /**
   * Update an existing note
   */
  static async updateNote(id: string, noteData: Note): Promise<Note> {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...noteData }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating note:', error)
      throw error
    }
  }

  /**
   * Delete a note
   */
  static async deleteNote(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return true
    } catch (error) {
      console.error('Error deleting note:', error)
      throw error
    }
  }
}
