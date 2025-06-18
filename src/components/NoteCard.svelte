<script lang="ts">
  import { useDeleteNote } from '$lib/hooks/useNotes'
  import NoteForm from './NoteForm.svelte'
  import type { Note } from '@/src/types/note'
  import { Button } from './ui/button'
  import { Trash } from '@lucide/svelte'
  const deleteQuery = useDeleteNote()
  export let note: Note
</script>

<div
  class="break-inside-avoid pb-4 border max-h-96 overflow-y-auto rounded-2xl shadow-md relative group min-h-full scrollbar-thin scrollbar-thumb-black"
  style="background-color: {note.color}"
>
  <h2
    class="mb-3 z-0 sticky top-0 bg-background p-4 text-lg border-b-4 px-4 font-semibold overflow-hidden"
  >
    <div
      class="flex gap-1 items-center justify-end py-1 absolute top-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50"
    >
      <NoteForm mode="edit" initialData={note} />
      <Button
        variant="destructive"
        size="icon"
        class="rounded-full cursor-pointer hover:bg-red-500/70"
        ><Trash /></Button
      >
    </div>
    {note.title}
  </h2>
  <p class="font-medium leading-5 tracking-normal text-sm px-6 text-gray-700">
    {note.content}
  </p>
</div>
