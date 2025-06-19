<script lang="ts">
  import { useDeleteNote } from '$lib/hooks/useNotes'
  import NoteForm from './NoteForm.svelte'
  import type { Note } from '@/src/types/note'
  import { Button, buttonVariants } from './ui/button'
  import { Trash } from '@lucide/svelte'
  import { Dialog, DialogContent, Trigger } from './ui/dialog'
  import { cn, formatDate } from '$lib/utils'
  // Only create the mutation once per component instance
  const deleteMutation = useDeleteNote()

  export let note: Note
  let isOpen = false
  // Use a stable function reference for event handler
  function handleDelete() {
    if (note.id) {
      $deleteMutation.mutate(note.id)
      isOpen = false
    }
  }
</script>

<div
  class="break-inside-avoid pb-4 border-4 border-muted-foreground max-h-96 shadow-md relative group min-h-full scrollbar-thin scrollbar-thumb-black hover:bg-black flex flex-col"
  style="background-color: {note.color}"
>
  <div
    class="mb-3 z-0 top-0 bg-background p-4 text-lg border-b-4 border-muted-foreground px-4 font-semibold overflow-hidden"
  >
    <div
      class="flex gap-1 items-center justify-end py-1 absolute top-1 right-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-50"
    >
      <!-- Only render NoteForm and Button if note.id exists -->
      {#if note.id}
        <NoteForm mode="edit" initialData={note} />

        <Dialog bind:open={isOpen}>
          <Trigger
            class={cn(
              buttonVariants({ variant: 'destructive', size: 'icon' }),
              'rounded-full cursor-pointer hover:bg-red-500/70'
            )}><Trash /></Trigger
          >
          <DialogContent class="flex flex-col items-center gap-6 py-8">
            <div class="flex flex-col items-center gap-2">
              <Trash class="w-8 h-8 text-destructive" />
              <h3 class="text-lg font-semibold">Delete this note?</h3>
              <p class="text-sm text-muted-foreground text-center max-w-xs">
                Are you sure you want to delete this note? This action cannot be
                undone.
              </p>
            </div>
            <div class="flex gap-4 mt-4">
              <Button
                variant="outline"
                onclick={() => (isOpen = false)}
                class="min-w-[80px] cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onclick={handleDelete}
                variant="destructive"
                class="min-w-[80px] cursor-pointer"
                aria-label="Delete note"
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      {/if}
    </div>
    {note.title}
  </div>

  <div class="flex-1 overflow-y-auto">
    <p class="font-medium leading-5 tracking-normal text-sm px-6 text-gray-700">
      {note.content}
    </p>
  </div>

  <!-- Hover footer with date and category -->
  <div
    class="absolute left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-6 py-2 flex justify-between items-center bg-white border-t-4 text-xs"
    style="pointer-events: none;"
  >
    <span class="text-gray-500">{formatDate(note.createdAt || '') || null}</span
    >
    <span class="text-gray-600 font-semibold">{note.category}</span>
  </div>
</div>
