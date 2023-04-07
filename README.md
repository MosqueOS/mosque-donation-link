# Mosque Donation Link

This application allows mosques to create a unique link that can be shared with donors to collect donations online.

## Example App

<img src="/public/rmt.mosque.fund.png"
     alt="Example Mosque.Fund app screenshot"
     width="500px" />

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
