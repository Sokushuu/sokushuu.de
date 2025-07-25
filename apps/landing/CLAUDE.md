# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production (runs TypeScript compiler + Vite build)
- `bun run lint` - Run ESLint for code linting
- `bun run preview` - Preview production build locally

## Architecture Overview

This is a React + TypeScript landing page application for Sokushuu, built with Vite and using Tailwind CSS v4 for styling.

### Key Architecture Patterns

**Theme System**: The app uses a sophisticated theme context (`src/contexts/ThemeContext.tsx`) that supports light/dark/system themes with localStorage persistence and system preference detection.

**API Integration**: Custom React hooks in `src/hooks/api/` handle backend communication:
- `useLaunchDate` - Fetches launch countdown date
- `useWaitlistCount` - Gets current waitlist subscriber count  
- `useWaitlistSubscribe` - Handles email subscription to waitlist

**Component Structure**: 
- `src/pages/` - Top-level page components (LandingPage, etc.)
- `src/components/` - Reusable UI components with barrel exports via `index.ts`
- Components are organized by feature (CountdownSection, HeroSection, etc.)

**Analytics**: PostHog integration for page view tracking with automatic route change detection.

**Routing**: React Router v7 with routes for main landing page (`/`) and survey page (`/survey/pengguna-airdrop`).

### API Configuration

Backend API configuration is centralized in `src/config/api.ts` with environment variable support (`VITE_API_URL`). Default development URL is `http://localhost:8787`.

### Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4 with Vite plugin
- **Icons**: Lucide React
- **Analytics**: PostHog, Mixpanel
- **Build Tool**: Vite with SWC for React compilation