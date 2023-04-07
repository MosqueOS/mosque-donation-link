import DonationBucket from "@/components/DonationBucket/DonationBucket"
import Footer from "@/components/Footer/Footer"
import Head from "next/head"

type Mosque = {
  name: string | undefined
  logo: string | undefined
}

export async function getStaticProps() {
  const mosque: Mosque = {
    name: process.env.NEXT_PUBLIC_MOSQUE_NAME,
    logo: process.env.NEXT_PUBLIC_MOSQUE_LOGO_URL,
  }

  return {
    props: {
      mosque,
    },
  }
}

export default function Home({ mosque }: { mosque: Mosque }) {
  return (
    <>
      <Head>
        <title>{`${mosque.name} | Mosque Donation Link`}</title>
        <meta name="description" content={`${mosque.name} | Mosque Donation Link`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 mb-5 mt-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mosque.logo}
            className="max-w-xs h-25 mb-5 inline-block rounded-lg"
            alt={`${mosque.name} logo`}
          />
          <h1 className="mb-10 text-xl md:text-3xl font-bold">{mosque.name}</h1>
          <form method="GET" action="/api/checkout" className="w-full md:w-auto">
            <DonationBucket />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 mt-5"
            >
              Donate
            </button>
          </form>
        </div>
        <Footer />
      </main>
    </>
  )
}
