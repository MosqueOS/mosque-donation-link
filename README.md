# Mosque Donation Link

This application allows mosques to create a unique link that can be shared with donors to collect donations online.

## Example App

<img src="/public/rmt.mosque.fund.png"
     alt="Example Mosque.Fund app screenshot"
     width="500px" />

## Creating a link for your own mosque

1. Create a [Stripe Account](https://dashboard.stripe.com/register)
2. Create a [Stripe API Secret Key](https://dashboard.stripe.com/apikeys)
3. Click on the deploy button below to fork and deploy your own instance:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMosqueOS%2Fmosque-donation-link&env=APP_URL,STRIPE_KEY,NEXT_PUBLIC_MOSQUE_NAME,NEXT_PUBLIC_MOSQUE_LOGO_URL&project-name=mosque-donation-link&repository-name=mosque-donation-link)

## Setting up local dev environment

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
