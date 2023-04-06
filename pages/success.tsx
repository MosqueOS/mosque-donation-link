import Head from "next/head"
import Footer from "@/components/Footer/Footer"

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

function PaySuccess({ mosque }: { mosque: Mosque }) {
  if (!mosque) return <></>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <Head>
        <title>{`${mosque.name} |  Mosque Fund`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mosque.logo}
          className="max-w-xs h-25 mb-5 inline-block rounded-lg"
          alt={`${mosque.name} logo`}
        />
        <p className="text-sm text-gray-400">Thank you for your donation!</p>
        <a
          href={`/`}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 mt-5"
        >
          Donate again
        </a>
      </main>

      <Footer />
    </div>
  )
}

export default PaySuccess
