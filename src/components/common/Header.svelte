<script lang="ts">
  import { Search } from '@lucide/svelte'
  import { Input } from '../ui/input'
  import NoteForm from '../NoteForm.svelte'

  let searchQuery = ''

  function handleSearch() {
    console.log('Searching for:', searchQuery)
  }
</script>

<header
  class="p-4 border-b-8 flex items-center justify-center h-[10vh] bg-card"
>
  <div class="container mx-auto flex items-center px-8">
    <div class="text-2xl text-muted-foreground font-bold">LOGO</div>
    <form on:submit|preventDefault={handleSearch} class="mx-8">
      <div class="relative max-w-md">
        <Search
          class="absolute text-black left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
        />
        <Input
          type="text"
          name="search"
          placeholder="Search for notes..."
          class="pl-10 w-full h-12 rounded-md shadow-none text-black"
          bind:value={searchQuery}
        />
      </div>
    </form>
    <div
      class="relative flex flex-row items-center shadow-xs transition-all rounded-sm justify-center h-12 px-1 bg-white border min-w-3xl"
    >
      <NoteForm />
    </div>
  </div>
</header>
