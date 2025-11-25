/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracingIncludes: {
    "/*": ["./registry/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
    ],
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  redirects() {
    return [
      // Keep only essential redirects for view route
      {
        source: "/view/styles/:style/:name",
        destination: "/view/:name",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
