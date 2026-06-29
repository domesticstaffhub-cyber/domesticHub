import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Domestic Staffing Hub | Trusted Domestic Staffing",
  description:
    "Request trusted chefs, drivers, home tutors, maids, nannies, caregivers, and domestic support staff.",
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "Domestic Staffing Hub",
    description: "Trusted domestic staffing for homes, families, restaurants, hotels, and businesses.",
    images: ["/images/brand/logo.jpeg"]
  }
};

export const viewport: Viewport = {
  themeColor: "#082e8a",
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
      <body>{children}</body>
    </html>
  );
}
