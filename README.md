# monorepo

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Next.js, Express, TRPC, and more.


## Features

- **TypeScript** – Type safety and improved developer experience
- **Next.js** – Full-stack React framework
- **React Native** – Build mobile apps using React
- **Expo** – Tools for React Native development
- **TailwindCSS** – Utility-first CSS for rapid UI development
- **shadcn/ui** – Reusable UI components
- **Express** – Fast, unopinionated web framework
- **tRPC** – End-to-end type-safe APIs
- **Node.js** – Runtime environment
- **Prisma** – TypeScript-first ORM
- **PostgreSQL** – Database engine
- **Authentication** – Better-Auth
- **Transactional Emails** – Email templates and sending (see the `transactional` package)
- **Biome** – Linting and formatting
- **Turborepo** – Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Don't forget to approve builds if you get the warning

```bash
pnpm approve-build
```

## Database Setup

This project uses PostgreSQL with Prisma.

1. Make sure you have a PostgreSQL database set up.
2. Update your `apps/server/.env` file with your PostgreSQL connection details.

3. Apply the schema to your database:

```bash
pnpm run db:push
```

Then, generate the prisma client:

```bash
pnpm run db:generate
```

Then, run the development server:

```bash
pnpm run dev
```

**⚠️ WARNING:** On Windows terminal may fail since the db:push command. If it does, go to the turbo.json file and modify the value of "ui" from "tui" to "stream".

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.
Use the Expo Go app to run the mobile application.
The API is running at [http://localhost:3000](http://localhost:3000).

## Git Hooks and Formatting

- Format and lint fix: `pnpm run check`

## Project Structure

```
monorepo/
├── apps/
│   ├── web/         # Frontend application (Next.js)
│   ├── native/      # Mobile application (React Native, Expo)
│   └── server/      # Backend API (Express, TRPC)
├── packages/
│   ├── api/            # API layer / business logic
│   ├── auth/           # Authentication configuration & logic
│   ├── db/             # Database schema & queries
│   ├── transactional/  # Transactional emails (templates & logic)
```


## Available Scripts

- `pnpm run dev` : Start all applications in development mode
- `pnpm run build` : Build all applications
- `pnpm run dev:web` : Start only the web application
- `pnpm run dev:server` : Start only the server
- `pnpm run dev:native` : Start the React Native/Expo development server
- `pnpm run check-types` : Check TypeScript types across all apps
- `pnpm run db:push` : Push schema changes to database
- `pnpm run db:generate` : Generate database client/types
- `pnpm run db:migrate` : Run database migrations
- `pnpm run db:studio` : Open database studio UI
- `pnpm run email:dev`: Preview transactional emails in development
- `pnpm run check` : Run Biome formatting and linting

## Transactional Emails

The `transactional` package contains all transactional email templates (forgot password, verification, etc.) and the logic to send them. To preview emails in development:

```bash
pnpm run email:dev
```

## Environment Variables

Each application has a `.env.sample` file at the root of its folder (`apps/server`, `apps/web`, etc.). Copy this file to `.env` and fill in the missing values.

Some sensitive variables (API keys, secrets, etc.) are not provided and must be generated or requested from a project administrator.

### How to get missing environment variables

1. Copy the `.env.sample` file to `.env` in each relevant folder:
	```bash
	cp apps/server/.env.sample apps/server/.env
	cp apps/web/.env.sample apps/web/.env
	# etc.
	```
2. Fill in the missing values (Google OAuth keys, secrets, etc.)
3. For shared variables (e.g. local URLs), keep the default values.
