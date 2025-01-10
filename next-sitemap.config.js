const currentSiteUrl = process.env.NEXT_PUBLIC_DOMAIN_NAME
const prodUrl = ""
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: currentSiteUrl || prodUrl,
    generateRobotsTxt: true,
    exclude: ["/not-found", "/error"],
    robotsTxtOptions: {
        policies: currentSiteUrl === prodUrl ? [{ userAgent: "*", allow: "/" }] : [{ userAgent: "*", disallow: "/" }],
    },
}

