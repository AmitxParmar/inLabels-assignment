<script lang="ts">
  import NoteCard from '../components/NoteCard.svelte'
  import Sort from '../components/Sort.svelte'
  import { useInfiniteNotes } from '$lib/hooks/useNotes'
  import { searchTerm } from '../stores/search'
  import { sortOptions, type SortOptions } from '../stores/sort'
  import { onDestroy } from 'svelte'
  import { Skeleton } from '../components/ui/skeleton'
  import { Button } from '../components/ui/button'

  let unsubscribe: () => void
  let unsubscribeSort: () => void
  let search = ''
  let sort: SortOptions = { sortBy: 'title', order: 'asc' }

  unsubscribe = searchTerm.subscribe((val) => {
    search = val
  })

  // Add sort subscription
  unsubscribeSort = sortOptions.subscribe((val) => {
    sort = val
  })

  onDestroy(() => {
    unsubscribe()
    unsubscribeSort()
  })

  // Update the reactive statement
  $: notesQuery = useInfiniteNotes(20, search, sort.sortBy, sort.order)
</script>

<div class="flex flex-row h-[calc(100vh-10vh)]">
  <aside class="hidden lg:block border-r-8 bg-white h-full w-56 min-h-full">
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
  <div class="flex flex-col flex-1 min-w-0">
    <div class="p-4 border-b-8 bg-white">
      <Sort />
    </div>
    <main
      class="w-full min-h-full p-4 pb-28 max-h-[calc(100vh-20vh)] overflow-y-auto"
    >
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {#if $notesQuery.isLoading}
          {#each Array(8)}
            <Skeleton class="h-96 bg-black/30" />
          {/each}
        {:else if $notesQuery.data}
          {#each $notesQuery.data.pages as page}
            {#each page.notes as note}
              <NoteCard {note} />
            {/each}
          {/each}
        {/if}
      </div>

      {#if $notesQuery.hasNextPage}
        <div class="flex mt-6 justify-center">
          <Button
            class="cursor-pointer rounded-none border-4 border-muted-foreground"
            onclick={() => $notesQuery.fetchNextPage()}
            disabled={$notesQuery.isFetchingNextPage}
          >
            {#if $notesQuery.isFetchingNextPage}
              Loading...
            {:else}
              Load More
            {/if}
          </Button>
        </div>
      {/if}
    </main>
  </div>
</div>
