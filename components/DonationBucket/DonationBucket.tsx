/* This example requires Tailwind CSS v2.0+ */
import { useState } from "react"
import { RadioGroup } from "@headlessui/react"

type DonationAmount = {
  id: number
  title: string
  description?: string
}

const donationAmounts: DonationAmount[] = [
  { id: 5, title: "£5", description: "Donate £5" },
  { id: 10, title: "£10", description: "Donate £10" },
  { id: 0, title: "Other", description: "Donate a custom amount" },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function DonationBucket() {
  const [selectedAmount, setSelectedTippingAmount] = useState(donationAmounts[0])
  const [feeAmount, setFeeAmount] = useState(donationAmounts[0].id)

  let calculateFee = (amount = feeAmount) => {
    if (!amount) return 0
    let fee = amount * 0.03 + 0.2
    return fee.toFixed(2)
  }

  let selectedAmountChanged = (e: any) => {
    setSelectedTippingAmount(e)
    setFeeAmount(e.id)
  }

  let customAmountChanged = (e: any) => {
    setFeeAmount(parseInt(e.target.value))
  }

  return (
    <>
      <RadioGroup value={selectedAmount} onChange={selectedAmountChanged}>
        <RadioGroup.Label className="text-base font-medium text-gray-900">
          Select an amount to donate
        </RadioGroup.Label>

        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
          {donationAmounts.map((donationAmount) => (
            <RadioGroup.Option
              key={donationAmount.id}
              value={donationAmount}
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
      <input type="hidden" name="amount" value={selectedAmount.id} />
      {selectedAmount.id === 0 && (
        <div>
          <label htmlFor="custom_amount" className="sr-only">
            Custom donation amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-700 font-medium text-xl">&pound;</span>
            </div>
            <input
              type="number"
              name="custom_amount"
              id="custom_amount"
              className="my-5 block w-full shadow-sm py-3 px-4 pl-12 placeholder-text-lg placeholder-gray-300 focus:ring-indigo-500 focus:border-indigo-700 border-gray-700 rounded-md font-medium text-2xl"
              min={1}
              max={100000}
              autoFocus
              pattern="\d*"
              onChange={customAmountChanged}
            />
          </div>
        </div>
      )}
      <fieldset className="space-y-5 my-4">
        <legend className="sr-only">Uplift</legend>
        <div className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id="uplift"
              aria-describedby="uplift-description"
              name="uplift"
              type="checkbox"
              className="focus:ring-indigo-700 h-6 w-6 text-indigo-700 border-gray-300 rounded"
              value={1}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="uplift" className="font-medium text-gray-700">
              Help cover transaction costs:{" "}
            </label>
            <span id="uplift-description" className="text-gray-500">
              &pound;{calculateFee()}
            </span>
          </div>
        </div>
      </fieldset>
    </>
  )
}
