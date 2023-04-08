import DonationForm from "@/components/DonationForm/DonationForm"
import Footer from "@/components/Footer/Footer"
import { startCase } from "lodash"
import Head from "next/head"

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

export default function Home({ mosque, tag }: { mosque: Mosque; tag: string }) {
  return (
    <>
      <Head>
        <title>{`Donation for ${startCase(tag)} | ${mosque.name} | Mosque Donation Link`}</title>
        <meta name="description" content={`${mosque.name} | Mosque Donation Link`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <DonationForm mosque={mosque} tag={tag} />
        <Footer />
      </main>
    </>
  )
}
