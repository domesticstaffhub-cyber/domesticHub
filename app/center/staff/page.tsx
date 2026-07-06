import type { Metadata } from "next";
import { GalleryCmsApp } from "@/components/GalleryCmsApp";

export const metadata: Metadata = {
  title: "Staff Center | Domestic Staffing Hub",
  robots: {
    index: false,
    follow: false
  }
};

export default function StaffCenterPage() {
  return <GalleryCmsApp />;
}
