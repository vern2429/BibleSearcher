# Bible Study Application

## Overview

This is a full-stack Bible study application built with React (frontend) and Express.js (backend). The application allows users to read, search, highlight, and bookmark Bible verses with a clean, modern interface designed for focused Bible study sessions.

## System Architecture

The application follows a traditional client-server architecture with clear separation between frontend and backend concerns:

- **Frontend**: React SPA with TypeScript, using Vite for development and build tooling
- **Backend**: Express.js REST API server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **UI Framework**: shadcn/ui components built on Radix UI and Tailwind CSS
- **State Management**: TanStack Query for server state management and local storage for client state

## Key Components

### Frontend Architecture
- **Component Structure**: Organized into UI components, pages, and reusable components
- **Styling**: Tailwind CSS with custom CSS variables for theming and highlight colors
- **Routing**: wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query for API state, local storage hooks for persistent client state

### Backend Architecture
- **API Layer**: Express.js with RESTful endpoints for Bible data, highlights, and bookmarks
- **Data Layer**: Drizzle ORM with PostgreSQL for structured Bible data storage
- **Storage Interface**: Abstracted storage layer supporting both database and in-memory implementations
- **Middleware**: Request logging, JSON parsing, and error handling

### Database Schema
- **bible_books**: Book metadata (name, testament, chapters, order)
- **bible_verses**: Individual verse content with book/chapter/verse references
- **highlights**: User highlight data with color coding and verse references
- **bookmarks**: User bookmark data with verse references

### Core Features
- **Bible Reading**: Navigate through books and chapters with verse display
- **Search**: Full-text search across all Bible verses
- **Highlighting**: Four-color highlighting system with persistent storage
- **Bookmarking**: Save favorite verses for quick access
- **Keyboard Shortcuts**: Quick navigation and feature access
- **Mobile Support**: Responsive design with mobile-specific navigation

## Data Flow

1. **User Navigation**: User selects book/chapter through sidebar or mobile navigation
2. **API Request**: Frontend queries `/api/verses/{book}?chapter={chapter}` endpoint
3. **Database Query**: Backend retrieves verses from PostgreSQL via Drizzle ORM
4. **Response Handling**: TanStack Query caches response and updates UI
5. **User Interactions**: Highlights/bookmarks are stored locally and optionally synced to backend
6. **Search Flow**: Search queries hit `/api/search` endpoint with full-text search results

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18 with TypeScript, React DOM, React Hook Form
- **UI Components**: Radix UI primitives, shadcn/ui component library
- **Styling**: Tailwind CSS with PostCSS processing
- **Data Fetching**: TanStack Query for server state management
- **Utilities**: date-fns for date handling, clsx for conditional classes

### Backend Dependencies
- **Runtime**: Node.js with TypeScript support via tsx
- **Database**: PostgreSQL with Neon serverless driver, Drizzle ORM and Kit
- **Validation**: Zod for runtime type validation with Drizzle integration
- **Session Management**: connect-pg-simple for PostgreSQL session storage

### Development Tools
- **Build Tools**: Vite for frontend bundling, esbuild for backend compilation
- **Type Checking**: TypeScript with strict configuration
- **Development**: Replit integration with runtime error overlay

## Deployment Strategy

The application is configured for deployment on Replit's autoscale platform:

- **Build Process**: Frontend builds to `dist/public`, backend compiles to `dist/index.js`
- **Production Server**: Serves static frontend files and API routes from single Express server
- **Database**: Uses DATABASE_URL environment variable for PostgreSQL connection
- **Port Configuration**: Runs on port 5000 with external port 80 mapping
- **Environment**: Supports both development and production configurations

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 13, 2025. Initial setup