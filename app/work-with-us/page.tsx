import type { Metadata } from "next";
import { WorkWithUsPage } from "@/components/WorkWithUsPage";

export const metadata: Metadata = {
  title: "I Need a Job | Domestic Staffing Hub",
  description: "Submit your name and the domestic service you can provide.",
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <WorkWithUsPage />;
}
