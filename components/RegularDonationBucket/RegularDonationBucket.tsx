/* This example requires Tailwind CSS v2.0+ */
import { useState } from "react"
import { RadioGroup } from "@headlessui/react"

type DonationAmount = {
  id: number
  title: string
  description?: string
}

const buckets = process.env.NEXT_PUBLIC_REGULAR_DONATION_BUCKETS?.length
  ? process.env.NEXT_PUBLIC_REGULAR_DONATION_BUCKETS
  : "[]"
const donationAmounts: DonationAmount[] = JSON.parse(buckets)

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function RegularDonationBucket() {
  const [selectedAmount, selectedAmountChanged] = useState(donationAmounts.length ? 0 : null)

  return (
    <>
      <RadioGroup value={selectedAmount} onChange={selectedAmountChanged}>
        <RadioGroup.Label className="text-base font-medium text-gray-900">
          Select an amount to donate
        </RadioGroup.Label>

        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
          {donationAmounts.map((donationAmount, index) => (
            <RadioGroup.Option
              key={index}
              value={index}
              className={({ checked, active }) =>
                classNames(
                  checked ? "border-transparent" : "border-gray-300",
                  active ? "ring-2 ring-indigo-700" : "",
                  "relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none w-full",
                )
              }
            >
              {({ checked, active }) => (
                <>
                  <div className="flex-1 flex">
                    <div className="flex flex-col p-2">
                      <RadioGroup.Label
                        as="span"
                        className="block font-medium text-gray-900 text-3xl"
                      >
                        {donationAmount.title}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className="mt-1 flex items-center text-sm text-gray-500"
                      >
                        {donationAmount.description}
                      </RadioGroup.Description>
                    </div>
                  </div>
                  <svg
                    className={classNames(!checked ? "invisible" : "", "h-5 w-5 text-indigo-500")}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div
                    className={classNames(
                      active ? "border" : "border-2",
                      checked ? "border-indigo-500" : "border-transparent",
                      "absolute -inset-px rounded-lg pointer-events-none",
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <input type="hidden" name="amountOption" value={selectedAmount ? selectedAmount : ""} />
    </>
  )
}
