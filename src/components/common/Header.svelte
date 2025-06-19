<script lang="ts">
  import { Search } from '@lucide/svelte'
  import { Input } from '../ui/input'
  import NoteForm from '../NoteForm.svelte'
  import { searchTerm } from '../../../src/stores/search'

  let searchQuery = ''

  function handleSearch() {
    console.log(searchQuery)
    searchTerm.set(searchQuery)
  }
</script>

<header
  class="lg:p-4 min-w-full w-full border-b-8 flex lg:items-center lg:justify-center h-[10vh] bg-card"
>
  <div class="text-2xl text-muted-foreground hidden lg:block font-bold">
    LOGO
  </div>
  <div
    class="flex-1 w-1/2 flex flex-row gap-4 items-center justify-start px-2 lg:px-8"
  >
    <div class="relative lg:max-w-2xl">
      <Search
        class="absolute text-black left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
      />
      <Input
        type="text"
        name="search"
        placeholder="Search for notes..."
        class="pl-10 w-full h-12 rounded-md shadow-none placeholder:text-sm placeholder:font-semibold align-middle text-black"
        bind:value={searchQuery}
        oninput={handleSearch}
      />
    </div>
    <NoteForm />
  </div>
</header>
