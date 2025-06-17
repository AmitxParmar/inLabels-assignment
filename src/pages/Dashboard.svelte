<script lang="ts">
  const notes = [
    {
      title: 'Meeting Notes',
      content:
        'Discuss project timeline and deliverables for Q2. Need to follow up with design team.',
      date: '2024-03-20',
      tags: ['work', 'meeting'],
    },
    {
      title: 'Shopping List',
      content: 'Milk, eggs, bread, vegetables, fruits, and cleaning supplies.',
      date: '2024-03-19',
      tags: ['personal', 'shopping'],
    },
    {
      title: 'Book Recommendations',
      content: '1. Atomic Habits\n2. Deep Work\n3. The Psychology of Money',
      date: '2024-03-18',
      tags: ['books', 'reading'],
    },
    {
      title: 'Project Ideas',
      content:
        'Build a note-taking app with real-time collaboration features and markdown support.',
      date: '2024-03-17',
      tags: ['project', 'ideas'],
    },
    {
      title: 'Fitness Goals',
      content:
        'Weekly workout plan:\n- Monday: Cardio\n- Wednesday: Strength\n- Friday: Yoga',
      date: '2024-03-16',
      tags: ['fitness', 'goals'],
    },
    {
      title: 'Recipe Collection',
      content:
        'Pasta Carbonara:\n- Spaghetti\n- Eggs\n- Pancetta\n- Parmesan\n- Black pepper',
      date: '2024-03-15',
      tags: ['food', 'recipe'],
    },
  ]
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
      {#each notes as note}
        <div class="break-inside-avoid rounded-2xl bg-white p-4 shadow-md">
          <h2 class="mb-2 text-lg font-semibold">{note.title}</h2>
          <p
            class="max-h-[calc(100vh-50vh)] overflow-y-scroll text-sm text-gray-700"
          >
            {note.content}
          </p>
        </div>
      {/each}
    </div>
  </main>
</div>
