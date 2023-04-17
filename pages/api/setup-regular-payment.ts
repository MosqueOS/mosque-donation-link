import type { NextApiRequest, NextApiResponse } from "next"

type DonationBody = {
  amountOption?: string
  tag?: string
}

type DonationAmount = {
  title: string
  description?: string
  url: string
}

const buckets = process.env.NEXT_PUBLIC_REGULAR_DONATION_BUCKETS?.length
  ? process.env.NEXT_PUBLIC_REGULAR_DONATION_BUCKETS
  : "[]"
const donationAmounts: DonationAmount[] = JSON.parse(buckets)

export default async function setupRegularPayment(req: NextApiRequest, res: NextApiResponse) {
  const data: DonationBody = req.query

  res.redirect(
    data.amountOption && donationAmounts[parseInt(data.amountOption)]?.url
      ? donationAmounts[parseInt(data.amountOption)]?.url
      : "/",
  )
}
