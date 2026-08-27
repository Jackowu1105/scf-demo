# SCF — Supply Chain Finance (Demo)

A supply chain finance web app with an LLM-first home, asset list, and asset calculator. This is a **pure frontend demo** — all data is hardcoded, no backend required.

Built with **Vue 3 + Vite 6 + TypeScript + Tailwind CSS v4 + Pinia**.

## 🚀 Live Demo

Deployed on Vercel.

## 🛠️ Local Development

```bash
npm install
npm run dev
```

Default dev server: `http://localhost:5173`

## Available Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run preview` — preview built app locally
- `npm run test:unit` — run Vitest unit tests
- `npm run type-check` — run vue-tsc type checking

## Project Structure

```text
src/
  views/           # Route-level pages (Home, Asset List, Asset Calculator, Login, Register)
  components/      # Shared UI and feature components
  composables/     # Reusable logic (asset management, selection, sort, theme)
  constants/       # Hardcoded demo data (assetData)
  types/           # TypeScript interfaces
```

## Pages

- `/` — Home (LLM-first conversational interface)
- `/asset-list` — Asset list with sorting and filtering
- `/asset-calculator` — Asset calculator (combine stores into assets)
- `/login` / `/register` — Auth screens (UI only, no backend)
