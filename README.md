# READ-U.md

![read-u.md banner](/public/images/banner.png)

A web application that assists in creating GitHub README.md files, featuring real-time Markdown preview and a Markdown table editor, both supporting tab synchronization.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Build For Production

```bash
npm run build:all
```

The command above will generate Github markdown's CSS and template's data before building the next app.

Then run:

```bash
npm run start
```

## Contributing

Read [contributing.md](/CONTRIBUTING.md).