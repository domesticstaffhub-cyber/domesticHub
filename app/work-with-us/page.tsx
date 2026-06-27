import type { Metadata } from "next";
import { WorkWithUsPage } from "@/components/WorkWithUsPage";

export const metadata: Metadata = {
  title: "Work With Us | Domestic Staffing Hub",
  description: "Submit interest to work with Domestic Staffing Hub as verified domestic staff."
};

export default function Page() {
  return <WorkWithUsPage />;
}
