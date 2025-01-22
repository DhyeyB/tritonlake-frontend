/** @type {import('next').NextConfig} */
const path = require("path")
const headers = require("./src/lib/headers")
const NODE_ENV = process.env.NODE_ENV || "development"
const nextConfig = {
    typescript: {
        ignoreBuildErrors: false,
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
    reactStrictMode: true,
    generateEtags: false,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    swcMinify: true,
    compiler: {
        // removeConsole: NODE_ENV === "production" ? true : false,
    },
    compress: true,
    poweredByHeader: false,
    devIndicators: {
        buildActivity: false,
    },
    env: {
        APP_ENV: NODE_ENV,
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    // Adding policies:
    async headers() {
        return [
            {
                source: "/(.*)",
                headers,
            },
        ]
    },
}

module.exports = nextConfig
