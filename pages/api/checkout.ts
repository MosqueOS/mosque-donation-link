import type { NextApiRequest, NextApiResponse } from "next"

type DonationBody = {
  amount?: string
  custom_amount?: string
  uplift?: string
  tag?: string
  selected_donation_description?: string
}

type LineItem = {
  price_data: PriceData
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
  20: 2000,
  30: 3000,
}

const customer: Mosque = {
  name: process.env.NEXT_PUBLIC_MOSQUE_NAME,
}

const baseUrl = process.env.APP_URL ? process.env.APP_URL : "https://mosque.fund"
const successUrl = `${baseUrl}/success?id={CHECKOUT_SESSION_ID}`
const cancelUrl = `${baseUrl}?cancelled=true`

export default async function checkoutAPI(req: NextApiRequest, res: NextApiResponse) {
  const stripe = require("stripe")(process.env.STRIPE_KEY)
  let data: DonationBody = req.query
  let uplift = data.uplift && data.uplift === "1" ? true : false
  let lineItems: LineItem[] = []
  let amount: number | null =
    data.amount && donationAmounts[data.amount] ? donationAmounts[data.amount] : null
  let customAmount: number | boolean = data.custom_amount ? parseInt(data.custom_amount) : false
  let selectedDonationDescription: string | boolean = data.selected_donation_description
    ? data.selected_donation_description
    : false

  const metadata = {
    donation_url: `${baseUrl}/${data.tag !== "general-donation" ? data.tag : ""}`,
    donation_tag: data.tag,
    donation_description: selectedDonationDescription,
  }

  if (amount === -1 && customAmount) {
    amount = customAmount * 100
  } else if (!amount) {
    return res.status(400).json({
      status: "error",
      message: "Invalid amount",
    })
  }

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

  if (uplift) {
    let fee: any = (amount / 100) * 0.015 + 0.2
    fee = fee.toFixed(2) * 100
    fee = fee.toFixed(0)

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

  const session = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    submit_type: "pay",
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    metadata: metadata,
    payment_intent_data: {
      metadata: metadata,
      description: `Donation for ${customer.name}`,
      statement_descriptor: `DONATION`,
    },
  })

  res.redirect(session.url)
}
