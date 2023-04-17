import DonationBucket from "../DonationBucket/DonationBucket"

type Mosque = {
  name: string | undefined
  logo: string | undefined
}

export default function DonationForm({ mosque, tag }: { mosque: Mosque; tag?: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 mb-5 mt-5">
      <form method="GET" action="/api/checkout" className="w-full md:w-auto">
        <input type="hidden" name="tag" value={tag ? tag : "general-donation"} />
        <DonationBucket />

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 mt-5"
        >
          Donate
        </button>
      </form>
    </div>
  )
}
