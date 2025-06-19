# Svelte + TypeScript + Vite Starter

A minimal template to get started with Svelte and TypeScript using Vite.

---

## Features

- **CRUD Notes**: Create, read, update, and delete notes.
- **Sort**: Sort notes by different fields and order.
- **Search**: Search notes by title or content.
- **Infinite Scroll**: Seamlessly load more notes as you scroll.

---

## How to Run the App

1. **Install pnpm (if you don't have it):**

   ```sh
   npm install -g pnpm
   ```

2. **Install dependencies:**

   ```sh
   pnpm install
   ```

3. **Start the development server:**

   ```sh
   pnpm dev
   ```

4. **Build for production:**

   ```sh
   pnpm build
   ```

5. **Preview the production build:**

   ```sh
   pnpm preview
   ```

## What I'd Do With More Time

- Implement a text formatting feature (e.g., bold, italic, underline) to enhance the editing experience.
- Add other features commonly found in note editor apps, such as tagging, search, pin post and autosave.

---

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Svelte Extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)

---

## Further Reading

- For a more full-featured Svelte framework, check out [SvelteKit](https://github.com/sveltejs/kit#readme).
- For details on HMR and its caveats, see [svelte-hmr](https://github.com/rixo/svelte-hmr#svelte-hmr).

---

## Example: External Store for State Preservation

If you want to preserve state across HMR, use an external store:
