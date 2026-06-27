import { BriefcaseBusiness, Car, ChefHat, GraduationCap, HeartHandshake } from "lucide-react";

export const services = [
  {
    slug: "chef",
    title: "Chefs",
    shortTitle: "Chef",
    summary:
      "Private, restaurant, hotel, pastry, event, and temporary chefs matched to the exact rhythm of your home or business.",
    image: "/images/services/chef.jpeg",
    accent: "from-brand-gold/35 via-white to-brand-sky/30",
    icon: ChefHat,
    services: [
      "Professional chef placement",
      "Private and home chef services",
      "Restaurant and hotel chef recruitment",
      "Event and catering chefs",
      "Pastry and bakery chefs",
      "Temporary and full-time chef staffing"
    ],
    promise: [
      "Skilled and experienced chefs",
      "Reliable recruitment process",
      "Professionals for homes and businesses",
      "Flexible staffing solutions"
    ]
  },
  {
    slug: "driver",
    title: "Drivers & Chauffeurs",
    shortTitle: "Driver",
    summary:
      "Verified personal, family, executive, logistics, fleet, and contract drivers selected for safety and professionalism.",
    image: "/images/services/driver.jpeg",
    accent: "from-brand-blue/25 via-white to-brand-mint/25",
    icon: Car,
    services: [
      "Corporate driver recruitment",
      "Personal and family drivers",
      "Executive chauffeur services",
      "Company and fleet drivers",
      "Temporary and contract drivers",
      "Driver verification and background checks"
    ],
    promise: [
      "Verified and experienced drivers",
      "Professional recruitment process",
      "Reliable and trustworthy personnel",
      "Fast and efficient placement"
    ]
  },
  {
    slug: "home-tutor",
    title: "Home Tutors",
    shortTitle: "Home Tutor",
    summary:
      "Qualified tutors for primary and secondary learners, exams, assignments, and one-on-one academic support.",
    image: "/images/services/home-tutor.jpeg",
    accent: "from-brand-mint/25 via-white to-brand-gold/25",
    icon: GraduationCap,
    services: [
      "Primary and secondary home tutoring",
      "Private lesson services",
      "Exam preparation classes",
      "Assignment and homework assistance",
      "WAEC, NECO, and JAMB coaching",
      "Weekend and holiday lessons"
    ],
    promise: [
      "Qualified and experienced educators",
      "Personalized teaching approach",
      "Flexible learning schedule",
      "Safe and professional service"
    ]
  },
  {
    slug: "caregiver",
    title: "Maid, Nanny & Caregiver",
    shortTitle: "Caregiver",
    summary:
      "Trusted domestic staff for housekeeping, nanny care, childcare, elder care, home support, and companionship.",
    image: "/images/services/maid-nanny-caregiver.jpeg",
    accent: "from-brand-sky/25 via-white to-brand-gold/20",
    icon: HeartHandshake,
    services: [
      "Professional maid services",
      "Experienced nanny services",
      "Elderly caregiver services",
      "Childcare support",
      "Live-in and live-out domestic staff",
      "Housekeeping and companion services"
    ],
    promise: [
      "Trusted and verified personnel",
      "Professional and experienced staff",
      "Reliable and affordable services",
      "Flexible service options"
    ]
  }
] as const;

export const serviceOptions = services.map((service) => ({
  label: service.title,
  value: service.slug
}));

export const seekerCategories = [
  ...serviceOptions,
  { label: "General Domestic Support", value: "general-domestic-support" },
  { label: "Other Verified Role", value: "other-verified-role" }
] as const;

export const stats = [
  { value: "4", label: "Core staffing categories" },
  { value: "24h", label: "Fast request follow-up" },
  { value: "100%", label: "Validated request intake" }
] as const;

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Request", href: "#request" },
  { label: "Contact", href: "#contact" }
] as const;

export const jobSeekerFeature = {
  icon: BriefcaseBusiness,
  title: "Work with Domestic Staffing Hub",
  description:
    "A separate intake path for verified professionals who want to join the staffing network."
};
