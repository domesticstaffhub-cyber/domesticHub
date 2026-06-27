import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
