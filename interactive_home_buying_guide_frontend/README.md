# Interactive Home Buying Guide Frontend (React)

A modern dashboard UI implementing the "Ocean Professional" theme.

## Features
- Three-column dashboard: Steps (left), Step Content (center), Progress & Resources (right)
- Routes: `/` (Dashboard), `/steps/:stepId`, `/resources`, `/progress`
- API client with env-configurable base URL
- Optimistic checklist toggling with persistence

## Environment
Create a `.env` or use defaults:
- `REACT_APP_API_BASE_URL` (default `http://localhost:3001`)

See `.env.example`.

## Scripts
- `npm start` - dev server on http://localhost:3000
- `npm test` - tests
- `npm run build` - production build
