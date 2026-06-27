import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About | Domestic Staffing Hub",
  description: "Learn about Domestic Staffing Hub, our mission, vision, and values for trusted domestic staffing."
};

export default function Page() {
  return <AboutPage />;
}
