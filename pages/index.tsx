import DonationForm from "@/components/DonationForm/DonationForm"
import Footer from "@/components/Footer/Footer"
import Head from "next/head"
import DonationTypeSwitch from "@/components/DonationTypeSwitch/DonationTypeSwitch"
import { useState } from "react"

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

interface Tab {
  name: string
  href: string
  current: boolean
}

export default function Home({ mosque }: { mosque: Mosque }) {
  const [activeTab, setActiveTab] = useState("One-off")

  let tabs: Tab[] = [
    { name: "One-off", href: "#one-off", current: activeTab === "One-off" },
    { name: "Monthly", href: "#monthly", current: activeTab === "Monthly" },
  ]

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
          <div className="mb-10 text-center">
            <h1 className="mb-4 text-xl md:text-3xl font-bold">{mosque.name}</h1>
          </div>
        </div>
        <DonationTypeSwitch tabs={tabs} setActiveTab={setActiveTab} />
        <DonationForm mosque={mosque} />
        <Footer />
      </main>
    </>
  )
}
