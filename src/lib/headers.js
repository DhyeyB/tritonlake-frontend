/**
 * Constructs the Content Security Policy (CSP) header string.
 * This policy helps to mitigate cross-site scripting (XSS) and other content injection attacks.
 */

let ContentSecurityPolicy = ""

// Allow only the same origin for base URI.
ContentSecurityPolicy += "base-uri 'self'; "

// Allow only the same origin for form actions.
ContentSecurityPolicy += "form-action 'self'; "

// Allow media from the same origin and Google's translate service.
ContentSecurityPolicy += "media-src 'self' https://translate.google.com/; "

// Allow frames from the same origin and Google.
ContentSecurityPolicy += "frame-src 'self' https://www.google.com; "

// Allow scripts from the same origin, inline scripts, eval, and specified trusted sources.
ContentSecurityPolicy +=
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com/ https://cdn.jsdelivr.net/ https://www.facebook.com https://connect.facebook.net https://storage.googleapis.com https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://images.dmca.com https://embed.tawk.to/ https://assets.calendly.com/; "

// Explicitly deny the use of object-src (e.g., plugins).
ContentSecurityPolicy += "object-src 'none'; "

// Allow connections to the same origin, localhost, and specified trusted sources, including data URIs.
// ContentSecurityPolicy +=
//     "connect-src 'self' localhost https://cognito-idp.eu-west-1.amazonaws.com/ https://api.dev.virtu-sign.com/ https://uia4f1xewf.execute-api.ap-south-1.amazonaws.com https://tq9sxuzm14.execute-api.ap-south-1.amazonaws.com/bs-handbook-bot-api-gateway-stage-prod/bsbot https://www.google.com https://graph.facebook.com https://analytics.google.com https://stats.g.doubleclick.net/ https://cdn.jsdelivr.net/ https://storage.googleapis.com/ https://www.google.co.in/ data:; "

// Allow styles from the same origin and inline styles, which are required by Next.js.
ContentSecurityPolicy += "style-src 'self' 'unsafe-inline' data:; "

/**
 * Array of HTTP headers to be set.
 */
const Headers = [
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    {
        key: "Server",
        value: "BS",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "X-Frame-Options",
        value: "sameorigin",
    },
    {
        key: "X-XSS-Protection",
        value: "1; mode=block",
    },
    {
        key: "Referrer-Policy",
        value: "same-origin",
    },
    {
        key: "Permissions-Policy",
        value: "geolocation=*", // Allow geolocation permission
    },
    {
        key: "Content-Security-Policy",
        value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(), // Remove extra spaces and trim the policy string.
    },
]

// Export the headers for use in the application.
module.exports = Headers
