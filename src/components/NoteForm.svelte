<script lang="ts">
  import { Pen } from '@lucide/svelte'
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

  const createNote = useCreateNote()
  const updateNote = useUpdateNote()

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
        await $createNote.mutateAsync(noteData)
      } else if (mode === 'edit' && initialData) {
        await $updateNote.mutateAsync({ id: initialData.id, data: noteData })
      }
      // Reset form after successful submission
      noteData = {
        title: '',
        content: '',
        color: '#F8F9FA',
        category: 'work',
        isPinned: false,
      }
      validationErrors = {}
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

<Dialog>
  <Trigger class="w-full">
    {#if mode === 'create'}
      <Button
        class="flex flex-row items-center justify-start gap-2 cursor-text hover:bg-accent shadow-none text-muted-foreground min-w-full bg-white"
      >
        <Pen class="text-muted-foreground w-4 h-4" />
        <span>Add note...</span>
      </Button>
    {:else}
      <Button
        class="flex flex-row items-center justify-start gap-2 hover:bg-accent shadow-none text-muted-foreground"
      >
        <Pen class="text-muted-foreground w-4 h-4" />
        <span>Edit</span>
      </Button>
    {/if}
  </Trigger>

  <DialogContent class="sm:max-w-[425px]">
    <div class="grid gap-4 py-4">
      <!-- Title -->
      <div class="space-y-2">
        <label
          for="title"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Title
        </label>
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
        <label
          for="content"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Content
        </label>
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
          <label
            for="color"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Color
          </label>
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
                <SelectItem
                  value="#F8F9FA"
                  style={{ backgroundColor: colors.lightGray }}
                  >Light Gray</SelectItem
                >
                <SelectItem
                  value="#FFF3BF"
                  style={{ backgroundColor: colors.softYellow }}
                  >Soft Yellow</SelectItem
                >
                <SelectItem
                  value="#D3F9D8"
                  style={{ backgroundColor: colors.softGreen }}
                  >Soft Green</SelectItem
                >
                <SelectItem
                  value="#FFE3E3"
                  style={{ backgroundColor: colors.softRed }}
                  >Soft Red</SelectItem
                >
                <SelectItem
                  value="#E7F5FF"
                  style={{ backgroundColor: colors.softBlue }}
                  >Soft Blue</SelectItem
                >
                <SelectItem
                  value="#F3F0FF"
                  style={{ backgroundColor: colors.softPurple }}
                  >Soft Purple</SelectItem
                >
              </div>
            </SelectContent>
          </Select>
          {#if validationErrors.color}
            <p class="text-sm text-destructive">{validationErrors.color[0]}</p>
          {/if}
        </div>

        <!-- Category -->
        <div class="space-y-2">
          <label
            for="category"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Category
          </label>
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
