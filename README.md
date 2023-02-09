# sveltekit-prisma-lucia-pico-starter

Starter sveltekit project using typescript, prisma for database, lucia for auth, and pico for css.
Also using zod for form validation
Note that the auth system has username/password and OAuth (github) support

## Initial setup

1. npm install
2. This uses MySql by default. Create a database and create a user that can fully access that database.
3. Set up the .env file (use .env.example as a starting point)

```
   Point the database URL to the database
   Setup OAuth providers if using (this one defaults to a github OAuth implementation)
```

4. Generate the db using prisma and generate the prisma client

```bash
   npx prisma db push (before production, move to migrations)
   npx prisma generate (Not needed? db push does it?)
   npx prisma db seed
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
