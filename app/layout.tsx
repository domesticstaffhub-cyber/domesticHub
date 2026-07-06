import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.domesticstaffinghub.com").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Domestic Staffing Hub | Verified Domestic Staff",
  description:
    "Request verified chefs, drivers, home tutors, maids, nannies, caregivers, and domestic support staff.",
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "Domestic Staffing Hub",
    description: "Verified domestic staffing for homes, families, restaurants, hotels, and businesses.",
    images: ["/images/brand/logo.jpeg"]
  }
};

export const viewport: Viewport = {
  themeColor: "#102037",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
