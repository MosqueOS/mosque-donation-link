/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    const tempRedirectUrl = process.env.NEXT_PUBLIC_TEMP_REDIRECT_URL ?? false
    if (tempRedirectUrl) {
      return [
        {
          source: '/',
          destination: tempRedirectUrl,
          permanent: false,
        },
      ]
    } else {
      return []
    }
  },
}

module.exports = nextConfig
