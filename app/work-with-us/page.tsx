import type { Metadata } from "next";
import { WorkWithUsPage } from "@/components/WorkWithUsPage";

export const metadata: Metadata = {
  title: "Work With Us | Domestic Staffing Hub",
  description: "Apply to offer domestic services through Domestic Staffing Hub."
};

export default function Page() {
  return <WorkWithUsPage />;
}
