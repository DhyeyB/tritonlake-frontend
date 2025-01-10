import "@/app/_styles/scss/custom/custom.scss"
import { Metadata } from "next"
import Script from "next/script"
import "../app/_styles/scss/custom/styles.scss"
import "../app/_styles/scss/custom/monthPicker.css"
import ErrorBoundary from "./_components/common/ErrorBoundary"

export const metadata: Metadata = {
    title: "TRITONLAKE",
    assets: ["https://unpkg.com/vis-timeline@latest/styles/vis-timeline-graph2d.min.css"],
    icons: [
        {
            rel: "apple-touch-icon",
            sizes: "120x120",
            url: "/assets/media/logos/favicon/favicon.ico",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            url: "/assets/media/logos/matrix-white.svg",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            url: "/assets/media/logos/favicon/favicon-16x16.png",
        },
    ],
    manifest: "/site.webmanifest",
    other: {
        "msapplication-TileColor": "#da532c",
        "theme-color": "#ffffff",
    },
    openGraph: {
        locale: "en_US",
        type: "article",
        title: "TRITONLAKE",
        siteName: "TRITONLAKE",
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                id="kt_app_body"
                data-bs-theme="light"
                data-kt-app-layout="light-sidebar"
                data-kt-app-header-fixed="true"
                data-kt-app-sidebar-enabled="true"
                data-kt-app-sidebar-fixed="true"
                data-kt-app-sidebar-hoverable="true"
                data-kt-app-sidebar-push-header="true"
                data-kt-app-sidebar-push-toolbar="true"
                data-kt-app-sidebar-push-footer="true"
                data-kt-app-toolbar-enabled="true"
                className="app-default"
            >
                <ErrorBoundary>{children}</ErrorBoundary>
                <Script src="../js/jquery-3.5.1.min.js" strategy="afterInteractive" />
                <Script src="../js/bootstrap.bundle.min.js" strategy="afterInteractive" />
                <Script src="../js/all.min.js" strategy="afterInteractive" />
                <script
                    async
                    type="text/javascript"
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_PLACES_API_KEY}&loading=async&libraries=places&callback=initMap`}
                ></script>
            </body>
        </html>
    )
}
