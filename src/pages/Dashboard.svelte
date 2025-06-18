<script lang="ts">
  import NoteCard from '../components/NoteCard.svelte'
  import { useInfiniteNotes } from '$lib/hooks/useNotes'
  import { searchTerm } from '../stores/search'
  import { onDestroy } from 'svelte'

  let unsubscribe: () => void
  let search = ''
  unsubscribe = searchTerm.subscribe((val) => {
    search = val
  })
  onDestroy(() => unsubscribe())
  console.log('search reachjing dashboarad')
  const notesQuery = useInfiniteNotes(20, search)
</script>

<div class="flex flex-row">
  <aside class="w-56 hidden lg:block border lg:h-[calc(100vh-10vh)] bg-white">
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
  <main class="w-full min-h-full p-4 max-h-[calc(100vh-10vh)] overflow-y-auto">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {#if $notesQuery.data}
        {#each $notesQuery.data.pages as page}
          {#each page.notes as note}
            <NoteCard {note} />
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
