This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Copy env file:

```
cp .env.local.example .env.local
```

Update .env file with correct info:

```
APP_URL=http://localhost:3000
STRIPE_KEY=sk_test_000000000000000

NEXT_PUBLIC_MOSQUE_NAME=My Amazing Mosque
NEXT_PUBLIC_MOSQUE_LOGO_URL="https://logo-url.com/image.png"
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
