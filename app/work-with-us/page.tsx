import type { Metadata } from "next";
import { WorkWithUsPage } from "@/components/WorkWithUsPage";

export const metadata: Metadata = {
  title: "I Need a Job | Domestic Staffing Hub",
  description: "Send a job request to work with Domestic Staffing Hub as domestic support staff.",
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <WorkWithUsPage />;
}
