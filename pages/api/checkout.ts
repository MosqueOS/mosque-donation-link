import type { NextApiRequest, NextApiResponse } from "next"

type DonationBody = {
  amount?: string
  custom_amount?: string
  uplift?: string
  tag?: string
  mode?: string
}

type LineItem = {
  price?: number
  price_data?: PriceData
  quantity: number
}

type PriceData = {
  currency: string
  unit_amount: number
  product_data: ProductData
}

type ProductData = {
  name: string
  description?: string
  images?: string[]
}

type Mosque = {
  name: string | undefined
}

const donationAmounts: any = {
  0: -1,
  5: 500,
  10: 1000,
}

const customer: Mosque = {
  name: process.env.NEXT_PUBLIC_MOSQUE_NAME,
}

const baseUrl = process.env.APP_URL ? process.env.APP_URL : "https://mosque.fund"
const successUrl = `${baseUrl}/success?id={CHECKOUT_SESSION_ID}`
const cancelUrl = `${baseUrl}?cancelled=true`

export default async function checkoutAPI(req: NextApiRequest, res: NextApiResponse) {
  let lineItems: LineItem[] = []
  const data: DonationBody = req.query
  const stripe = require("stripe")(process.env.STRIPE_KEY)

  let amount: number | null =
    data.amount && donationAmounts[data.amount] ? donationAmounts[data.amount] : null
  const customAmount: number | boolean = data.custom_amount ? parseInt(data.custom_amount) : false
  const uplift = data.uplift && data.uplift === "1" ? true : false
  const paymentMode = data.mode && data.mode === "subscription" ? "subscription" : "payment"

  const metadata = {
    donation_url: `${baseUrl}/${data.tag !== "general-donation" ? data.tag : ""}`,
    donation_tag: data.tag,
  }

  if (amount === -1 && customAmount) {
    amount = customAmount * 100
  } else if (!amount) {
    return res.status(400).json({
      status: "error",
      message: "Invalid amount",
    })
  }

  const donationPriceData = {
    currency: "GBP",
    unit_amount: amount,
    product_data: {
      name: "Donation amount",
      description: `Donation to ${process.env.NEXT_PUBLIC_MOSQUE_NAME}`,
    },
  }

  if (paymentMode === "subscription") {
    const donationSubscriptionPrice = await stripe.prices.create({
      currency: "GBP",
      unit_amount: amount,
      product_data: {
        name: "Donation amount",
      },
      recurring: { interval: "day" },
    })

    console.log(donationSubscriptionPrice)

    lineItems.push({
      price: donationSubscriptionPrice,
      quantity: 1,
    })
  } else {
    lineItems.push({
      price_data: {
        currency: "GBP",
        unit_amount: amount,
        product_data: {
          name: "Donation amount",
          description: `Donation to ${process.env.NEXT_PUBLIC_MOSQUE_NAME}`,
        },
      },
      quantity: 1,
    })
  }

  if (uplift) {
    let fee: any = (amount / 100) * 0.03 + 0.2
    fee = fee.toFixed(2) * 100
    fee = fee.toFixed(0)

    if (paymentMode === "subscription") {
      const upliftSubscriptionPrice = await stripe.prices.create({
        currency: "GBP",
        unit_amount: fee,
        product_data: {
          name: "Help cover the costs",
        },
        recurring: { interval: "month" },
      })

      lineItems.push({
        price: upliftSubscriptionPrice,
        quantity: 1,
      })
    } else {
      lineItems.push({
        price_data: {
          currency: "GBP",
          unit_amount: fee,
          product_data: {
            name: "Help cover the costs",
            description: "Covers transaction costs incurred by this donation",
          },
        },
        quantity: 1,
      })
    }
  }

  let stripeSessionData: any = {
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: paymentMode,
    payment_method_types: ["card"],
    line_items: lineItems,
    metadata: metadata,
  }

  if (paymentMode === "subscription") {
    stripeSessionData.billing_address_collection = "auto"
  }

  if (paymentMode === "payment") {
    stripeSessionData.submit_type = "pay"
    stripeSessionData.payment_intent_data = {
      metadata: metadata,
      description: `Donation for ${customer.name}`,
      statement_descriptor: `DONATION`,
    }
  }

  const session = await stripe.checkout.sessions.create(stripeSessionData)

  res.redirect(session.url)
}
