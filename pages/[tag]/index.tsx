import DonationForm from "@/components/DonationForm/DonationForm"
import DonationTypeSwitch from "@/components/DonationTypeSwitch/DonationTypeSwitch"
import Footer from "@/components/Footer/Footer"
import RegularDonationForm from "@/components/RegularDonationForm/RegularDonationForm"
import { startCase } from "lodash"
import Head from "next/head"
import { useState } from "react"

type Mosque = {
  name: string | undefined
  logo: string | undefined
}

export async function getServerSideProps({ query }: any) {
  const mosque: Mosque = {
    name: process.env.NEXT_PUBLIC_MOSQUE_NAME,
    logo: process.env.NEXT_PUBLIC_MOSQUE_LOGO_URL,
  }

  return {
    props: {
      mosque,
      tag: query.tag,
    },
  }
}

interface Tab {
  name: string
  href: string
  current: boolean
}

const regularDonationsActivated = process.env.NEXT_PUBLIC_REGULAR_DONATION_ENABLED === "true"

export default function Home({ mosque, tag }: { mosque: Mosque; tag: string }) {
  const [activeTab, setActiveTab] = useState("One-off")

  let tabs: Tab[] = [
    { name: "One-off", href: "#one-off", current: activeTab === "One-off" },
    { name: "Monthly", href: "#monthly", current: activeTab === "Monthly" },
  ]

  return (
    <>
      <Head>
        <title>{`Donation for ${startCase(tag)} | ${mosque.name} | Mosque Donation Link`}</title>
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
            {tag && (
              <p className="mt-6 text-sm shadow p-4 bg-white rounded">
                <span className="sr-only">Your donation will be used for:</span>{" "}
                <strong>{startCase(tag)}</strong>
              </p>
            )}
          </div>
        </div>
        {regularDonationsActivated ? (
          <DonationTypeSwitch tabs={tabs} setActiveTab={setActiveTab} />
        ) : null}
        {activeTab === "One-off" ? <DonationForm mosque={mosque} tag={tag} /> : null}
        {activeTab === "Monthly" ? <RegularDonationForm mosque={mosque} tag={tag} /> : null}
        <Footer />
      </main>
    </>
  )
}
