# NoteHub

A modern Next.js note manager connected to the NoteHub API. Browse, search,
create, and delete notes with advanced routing patterns, client-side caching,
pagination, loading states, form validation, and comprehensive error handling.

## Features

- **Advanced Routing**: Leverages Next.js App Router with parallel routes and
  intercepting routes for seamless modal interactions
- **Modal Preview**: Click any note to open a modal preview using intercepting
  routes without leaving the notes list
- **Note Management**: Create, read, and delete notes with automatic query
  invalidation after mutations
- **Search & Filter**: Filter notes by tags with dynamic route-based filtering
- **Pagination**: Browse notes with built-in pagination controls
- **Loading & Error States**: User-friendly loading indicators and error
  boundaries
- **Client-Side Caching**: Optimized data fetching with TanStack Query (React
  Query)
- **Persisted Drafts**: Preserve the note form draft in local storage with
  Zustand persist middleware
- **Responsive Design**: Mobile-friendly interface with CSS modules styling
- **Form Validation**: Robust note form validation using Formik and Yup
- **Notifications**: Toast feedback for failed mutations

## Tech Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules
- **State & Data**: TanStack Query (React Query), Zustand, Axios
- **Forms**: Formik, Yup
- **API Integration**: Axios with custom hooks

## Project Structure

```
app/
├── layout.tsx                  # Root layout and providers
├── page.tsx                    # Home page
├── error.tsx                   # Root error boundary
├── loading.tsx                 # Root loading state
├── globals.css                 # Global styles
├── notes/
│   ├── [id]/                    # Note details route
│   └── action/create/           # Create-note page
├── notes/filter/
│   ├── layout.tsx               # Filter layout
│   ├── [...slug]/               # Dynamic tag filter route
│   └── @sidebar/                # Sidebar parallel route
└── @modal/(.)notes/[id]/        # Intercepting modal route

components/                # Reusable components
├── Modal, NoteForm, NoteList, etc.

lib/hooks/                 # Custom React hooks
├── useFetchNotes
├── useFetchNoteById
└── useNotesMutations

lib/store/                 # Zustand stores
├── noteStore.ts            # Persisted note draft state
lib/api.ts                 # NoteHub API client
types/                     # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` in the project root and add your NoteHub API token:

```env
NEXT_PUBLIC_NOTEHUB_TOKEN=your_token_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Create an optimized production build
- `npm run start` - Serve the production build
- `npm run lint` - Run ESLint to check code quality

## Key Concepts

### Intercepting Routes

The modal preview feature uses Next.js intercepting routes `(.)notes/[id]` to
intercept navigation to individual note pages and display them as modals
instead.

### Parallel Routes

The `@modal` and `@sidebar` directories demonstrate parallel routes that render
simultaneously without affecting the main content flow.

### Dynamic Filtering

The `notes/filter/[...slug]` catch-all route enables flexible tag-based
filtering with clean URLs. The `@sidebar` parallel route keeps filter controls
visible alongside the filtered notes.

### Persisted Note Drafts

The `useNoteStore` Zustand store persists the current note form draft under the
`note-draft` local-storage key. This keeps unfinished form data available after
refreshing the create-note page.

### Data Fetching and Mutations

TanStack Query caches note lists and individual note details. Creating or
deleting a note invalidates the `notes` query so the list refreshes without a
manual page reload. The API token is read from `NEXT_PUBLIC_NOTEHUB_TOKEN`.

### Client Components

Components suffixed with `.client.tsx` are explicitly marked as Client
Components to enable interactive features and hooks.
