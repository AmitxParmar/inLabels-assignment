<script lang="ts">
  import { useInfiniteNotes } from '$lib/hooks/useNotes'
  const notesQuery = useInfiniteNotes()
</script>

<div class="flex flex-row">
  <aside class="w-56 border h-[calc(100vh-10vh)] bg-white">
    <div class="text-3xl my-4 text-center text-muted-foreground/50 font-black">
      LOGO
    </div>
    <div class="px-3 my-5">
      <div
        class="font-bold border bg-card-foreground/25 rounded-full px-4 py-2 flex items-center justify-start hover:cursor-pointer hover:bg-accent-foreground hover:text-background transition-all"
      >
        Notes
      </div>
    </div>
  </aside>
  <main class="w-full min-h-full p-4">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {#if $notesQuery.data}
        {#each $notesQuery.data.pages as page}
          {#each page.notes as note}
            <div class="break-inside-avoid rounded-2xl bg-white p-4 shadow-md">
              <h2 class="mb-2 text-lg font-semibold">{note.title}</h2>
              <p
                class="max-h-[calc(100vh-50vh)] overflow-y-scroll text-sm text-gray-700"
              >
                {note.content}
              </p>
            </div>
          {/each}
        {/each}
      {/if}
    </div>

    {#if $notesQuery.hasNextPage}
      <div class="flex justify-center mt-8">
        <button
          class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          on:click={() => $notesQuery.fetchNextPage()}
          disabled={$notesQuery.isFetchingNextPage}
        >
          {#if $notesQuery.isFetchingNextPage}
            Loading...
          {:else}
            Load More
          {/if}
        </button>
      </div>
    {/if}
  </main>
</div>
