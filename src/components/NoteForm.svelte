<script lang="ts">
  import { Pencil } from '@lucide/svelte'
  import { Dialog, DialogContent, Trigger } from './ui/dialog'
  import { Input } from './ui/input'
  import { Textarea } from './ui/textarea'
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
  } from './ui/select'
  import { z } from 'zod'
  import { Button } from './ui/button'
  import { formSchema } from '$lib/schema/noteFormSchema'
  import { colors } from '$lib/utils'
  import { useCreateNote, useUpdateNote } from '$lib/hooks/useNotes'
  import type { Note } from '@/src/types/note'
  import { Label } from './ui/label'
  import { toast } from 'svelte-sonner'

  export let mode: 'create' | 'edit' = 'create'
  export let initialData: Note | null = null

  // Local state for form data
  let noteData: z.infer<typeof formSchema> = initialData
    ? {
        title: initialData.title || '',
        content: initialData.content || '',
        color: (initialData.color as typeof noteData.color) || '#F8F9FA',
        category: initialData.category || 'work',
        isPinned: initialData.isPinned || false,
      }
    : {
        title: '',
        content: '',
        color: '#F8F9FA',
        category: 'work',
        isPinned: false,
      }

  // Local validation errors
  let validationErrors: Partial<Record<keyof typeof noteData, string[]>> = {}
  let isOpen = false
  // hooks to create and update api calls
  const createNote = useCreateNote()
  const updateNote = useUpdateNote()

  // handle data in edit mode
  $: if (isOpen && mode === 'edit' && initialData) {
    noteData = {
      title: initialData.title || '',
      content: initialData.content || '',
      color: (initialData.color as typeof noteData.color) || '#F8F9FA',
      category: initialData.category || 'work',
      isPinned: initialData.isPinned || false,
    }
    validationErrors = {}
  }

  function validateField(field: keyof typeof noteData) {
    const result = formSchema.safeParse(noteData)
    if (!result.success) {
      const fieldError = result.error.issues.find(
        (issue) => issue.path[0] === field
      )
      if (fieldError) {
        validationErrors[field] = [fieldError.message]
      } else {
        delete validationErrors[field]
      }
    } else {
      delete validationErrors[field]
    }
    validationErrors = { ...validationErrors }
  }

  async function handleSubmit(event: MouseEvent): Promise<void> {
    event.preventDefault()
    const result = formSchema.safeParse(noteData)
    if (!result.success) {
      // Set all validation errors
      validationErrors = {}
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof typeof noteData
        if (!validationErrors[fieldName]) {
          validationErrors[fieldName] = []
        }
        validationErrors[fieldName]!.push(issue.message)
      })
      return
    }

    try {
      if (mode === 'create') {
        await $createNote.mutateAsync(noteData, {
          onSuccess: () => {
            toast.success('Note created successfully!')
          },
        })
        // Only reset form after successful creation
        noteData = {
          title: '',
          content: '',
          color: '#F8F9FA',
          category: 'work',
          isPinned: false,
        }
      } else if (mode === 'edit' && initialData?.id) {
        await $updateNote.mutateAsync(
          { id: initialData.id, data: noteData },
          {
            onSuccess: () => {
              toast.success('Note updated successfully!')
            },
          }
        )
        // Don't reset form data in edit mode - keep the current values
      }

      validationErrors = {}
      isOpen = false
    } catch (error) {
      console.error('Error saving note:', error)
    }
  }

  // Handle real-time validation on blur
  function handleBlur(field: keyof typeof noteData) {
    validateField(field)
  }

  // Check if form is valid for submission
  $: isFormValid =
    noteData.title.trim().length >= 2 && noteData.content.trim().length >= 5
</script>

<Dialog bind:open={isOpen}>
  <Trigger class="w-full z-100">
    {#if mode === 'create'}
      <Button
        class="flex group h-12 border w-full max-w-56 flex-row items-center justify-start gap-2 cursor-text hover:bg-accent shadow-none text-muted-foreground  bg-white transition-colors duration-200"
      >
        <Pencil
          class="text-muted-foreground group-hover:text-foreground w-4 h-4 transition-colors duration-200"
        />
        <span class="transition-colors duration-200">Add note...</span>
      </Button>
    {:else}
      <Button
        size="icon"
        class="border-2 border-muted-foreground size-10 p-0.5 shadow-sm cursor-pointer hover:bg-accent rounded-full hover:text-black"
      >
        <Pencil class="" />
      </Button>
    {/if}
  </Trigger>

  <DialogContent class="sm:max-w-[425px]">
    <div class="grid gap-4 py-4">
      <!-- Title -->
      <div class="space-y-2">
        <Label
          for="title"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Title
        </Label>
        <Input
          id="title"
          bind:value={noteData.title}
          placeholder="Enter note title"
          onblur={() => handleBlur('title')}
          class="bg-secondary"
        />
        {#if validationErrors.title}
          <p class="text-sm text-destructive">{validationErrors.title[0]}</p>
        {/if}
      </div>

      <!-- Content -->
      <div class="space-y-2">
        <Label
          for="content"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Content
        </Label>
        <Textarea
          id="content"
          bind:value={noteData.content}
          placeholder="Enter note content"
          onblur={() => handleBlur('content')}
          class="bg-secondary h-56"
        />
        {#if validationErrors.content}
          <p class="text-sm text-destructive">{validationErrors.content[0]}</p>
        {/if}
      </div>

      <div class="grid grid-cols-2 gap-2">
        <!-- Color -->
        <div class="space-y-2 w-full">
          <Label
            for="color"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Color
          </Label>
          <Select bind:value={noteData.color} type="single">
            <SelectTrigger class="w-full bg-secondary">
              <SelectLabel>
                {#if noteData.color && noteData.color.length > 0}
                  {noteData.color}
                {:else}
                  Select a color
                {/if}
              </SelectLabel>
            </SelectTrigger>
            <SelectContent>
              <div>
                {#each Object.entries(colors) as [key, color]}
                  <SelectItem value={color} style={{ backgroundColor: color }}>
                    {key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase())}
                  </SelectItem>
                {/each}
              </div>
            </SelectContent>
          </Select>
          {#if validationErrors.color}
            <p class="text-sm text-destructive">{validationErrors.color[0]}</p>
          {/if}
        </div>

        <!-- Category -->
        <div class="space-y-2">
          <Label
            for="category"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Category
          </Label>
          <Select bind:value={noteData.category} type="single">
            <SelectTrigger class="w-full bg-secondary">
              <SelectLabel>
                {#if noteData.category && noteData.category.length > 0}
                  {noteData.category}
                {:else}
                  Select a category
                {/if}
              </SelectLabel>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="ideas">Ideas</SelectItem>
            </SelectContent>
          </Select>
          {#if validationErrors.category}
            <p class="text-sm text-destructive">
              {validationErrors.category[0]}
            </p>
          {/if}
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <Button
        disabled={!isFormValid ||
          $createNote.isPending ||
          $updateNote.isPending}
        type="button"
        onclick={handleSubmit}
      >
        {#if mode === 'create'}
          {$createNote.isPending ? 'Saving...' : 'Save Note'}
        {:else}
          {$updateNote.isPending ? 'Saving...' : 'Update Note'}
        {/if}
      </Button>
    </div>
  </DialogContent>
</Dialog>
