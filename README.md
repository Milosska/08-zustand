# NoteHub

A modern Next.js note manager connected to the NoteHub API. Browse, search,
create, and delete notes with advanced routing patterns, client-side caching,
pagination, loading states, and comprehensive error handling.

## Features

- **Advanced Routing**: Leverages Next.js App Router with parallel routes and
  intercepting routes for seamless modal interactions
- **Modal Preview**: Click any note to open a modal preview using intercepting
  routes without leaving the notes list
- **Note Management**: Create, read, update, and delete notes with real-time
  updates
- **Search & Filter**: Filter notes by tags with dynamic route-based filtering
- **Pagination**: Browse notes with built-in pagination controls
- **Loading & Error States**: User-friendly loading indicators and error
  boundaries
- **Client-Side Caching**: Optimized data fetching with TanStack Query (React
  Query)
- **Responsive Design**: Mobile-friendly interface with CSS modules styling
- **Form Validation**: Robust form validation using Formik and Yup

## Tech Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules
- **State & Data**: TanStack Query (React Query), Axios
- **Forms**: Formik, Yup
- **API Integration**: Axios with custom hooks

## Project Structure

```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Home page
├── error.tsx              # Error boundary
├── loading.tsx            # Root loading state
├── globals.css            # Global styles
├── notes/                 # Notes routes
│   ├── page.tsx          # Notes list page
│   ├── [id]/             # Note details route
│   │   └── NoteDetails.client.tsx
│   └── filter/           # Filtered notes routes
│       ├── layout.tsx
│       ├── [...slug]/   # Dynamic filter params
│       └── @sidebar/     # Sidebar parallel route
└── @modal/               # Parallel modal route
    └── (.)notes/[id]/   # Intercepting route for modals

components/                # Reusable components
├── Modal, NoteForm, NoteList, etc.

hooks/                     # Custom React hooks
├── useFetchNotes
├── useFetchNoteById
└── useNotesMutations

lib/                       # Utilities and API config
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

The `filter/[...slug]` catch-all route enables flexible tag-based filtering with
clean URLs.

### Client Components

Components suffixed with `.client.tsx` are explicitly marked as Client
Components to enable interactive features and hooks.
