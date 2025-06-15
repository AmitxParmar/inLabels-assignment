import type { Note } from "@/types/note";

const BASE_URL = "https://mockapi.io/clone/684ed48bf0c9c9848d293c42/api/v1";

export class NotesApi {
  /**
   * Fetch all notes with optional search and pagination
   */
  static async getNotes(page = 1, limit = 20, search = "") {
    try {
      let url = `${BASE_URL}/notes?page=${page}&limit=${limit}&sortBy=createdAt&order=desc`;

      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  }

  /**
   * Create a new note
   */
  static async createNote(noteData: Note) {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: noteData.title,
          content: noteData.content,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  }

  /**
   * Update an existing note
   */
  static async updateNote(id: string, noteData: Note) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: noteData.title,
          content: noteData.content,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  }

  /**
   * Delete a note
   */
  static async deleteNote(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  }
}
