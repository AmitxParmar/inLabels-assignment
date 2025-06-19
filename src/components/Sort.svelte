<script lang="ts">
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectLabel,
  } from './ui/select'
  import { sortOptions } from '../stores/sort'

  let selectedSort = 'title-asc'

  const sortChoices = [
    { value: 'title-asc', label: 'Title A-Z' },
    { value: 'title-desc', label: 'Title Z-A' },
    { value: 'createdAt-desc', label: 'Newest First' },
    { value: 'createdAt-asc', label: 'Oldest First' },
    { value: 'updatedAt-desc', label: 'Recently Updated' },
    { value: 'updatedAt-asc', label: 'Least Recently Updated' },
  ]

  function handleSortChange() {
    const [sortBy, order] = selectedSort.split('-')
    sortOptions.set({ sortBy, order: order as 'asc' | 'desc' })
  }

  $: if (selectedSort) {
    handleSortChange()
  }
</script>

<div class="flex items-center gap-2">
  <span class="text-sm font-medium text-muted-foreground">Sort by:</span>
  <Select bind:value={selectedSort} type="single">
    <SelectTrigger class="w-48 bg-white">
      <SelectLabel>
        {sortChoices.find((choice) => choice.value === selectedSort)?.label ||
          'Select sort option'}
      </SelectLabel>
    </SelectTrigger>
    <SelectContent>
      {#each sortChoices as choice}
        <SelectItem value={choice.value}>
          {choice.label}
        </SelectItem>
      {/each}
    </SelectContent>
  </Select>
</div>
