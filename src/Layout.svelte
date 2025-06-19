<script lang="ts">
  import Header from './components/common/Header.svelte'
  import Sonner from './components/ui/sonner/sonner.svelte'

  import Dashboard from './pages/Dashboard.svelte'
</script>

<div
  class="flex flex-col min-w-screen max-w-screen min-h-screen overflow-hidden bg-secondary"
>
  <Sonner />
  <Header />
  <main class="flex-1">
    <Dashboard />
  </main>
</div>
