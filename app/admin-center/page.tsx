import type { Metadata } from "next";
import { GalleryCmsApp } from "@/components/GalleryCmsApp";

export const metadata: Metadata = {
  title: "Admin Center | Domestic Staffing Hub",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminCenterPage() {
  return <GalleryCmsApp />;
}
