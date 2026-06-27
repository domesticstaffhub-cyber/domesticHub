import { BriefcaseBusiness, Car, ChefHat, GraduationCap, HeartHandshake, Home } from "lucide-react";

export const services = [
  {
    slug: "chef",
    title: "Chefs",
    shortTitle: "Chef",
    summary: "Professional chefs for homes, events, restaurants, hotels, and private dining.",
    detail:
      "Enjoy dependable culinary support from chefs selected for skill, hygiene, presentation, and the needs of your home or business.",
    image: "/images/services/chef.jpg",
    imagePosition: "center 38%",
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
      "Private and family chefs",
      "Event and catering support",
      "Restaurant and hotel staffing",
      "Temporary or full-time placement"
    ],
    highlights: ["Menu support", "Professional conduct", "Flexible schedules"],
    audience: "Homes, restaurants, hotels, lounges, and event hosts",
    process: "We listen to your kitchen routine, preferred cuisine, event size, and schedule before recommending the right chef profile.",
    assurance: "Each request is handled with attention to hygiene, presentation, reliability, and the standard your space requires."
  },
  {
    slug: "driver",
    title: "Drivers & Chauffeurs",
    shortTitle: "Driver",
    summary: "Reliable personal, family, executive, and company drivers for everyday movement.",
    detail:
      "Move with confidence through courteous drivers and chauffeurs matched for safety, discretion, punctuality, and professionalism.",
    image: "/images/services/driver_chauffeur.jpg",
    imagePosition: "center 36%",
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
      "Personal and family drivers",
      "Executive chauffeurs",
      "Company and fleet drivers",
      "Temporary driver support"
    ],
    highlights: ["Safety-minded", "Punctual service", "Polished presentation"],
    audience: "Families, executives, businesses, schools, and logistics teams",
    process: "We confirm your route pattern, schedule, vehicle expectations, and preferred driver arrangement before follow-up.",
    assurance: "Requests are approached with a focus on safety, discretion, timing, and dependable day-to-day movement."
  },
  {
    slug: "home-tutor",
    title: "Home Tutors",
    shortTitle: "Home Tutor",
    summary: "Patient, focused tutors for lessons, exam prep, assignments, and academic growth.",
    detail:
      "Give learners structured support at home through educators matched to their level, pace, schedule, and learning goals.",
    image: "/images/services/home_tutor.jpg",
    imagePosition: "center 34%",
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
      "Primary and secondary tutoring",
      "Exam preparation",
      "Homework support",
      "Weekend and holiday lessons"
    ],
    highlights: ["Personalized lessons", "Calm learning support", "Progress-focused"],
    audience: "Parents, guardians, primary learners, secondary learners, and exam candidates",
    process: "We consider the learner's class level, subject needs, learning pace, location, and preferred lesson schedule.",
    assurance: "The goal is calm, consistent learning support that helps each learner gain confidence and improve steadily."
  },
  {
    slug: "caregiver",
    title: "Maid, Nanny & Caregiver",
    shortTitle: "Caregiver",
    summary: "Trusted support for housekeeping, childcare, nanny care, elder care, and companionship.",
    detail:
      "Bring comfort and order into the home with caring domestic staff selected for reliability, respect, and day-to-day support.",
    image: "/images/services/maid_nanny_caregiver.jpg",
    imagePosition: "center 24%",
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
      "Housekeeping services",
      "Nanny and childcare support",
      "Elder care assistance",
      "Live-in or live-out staff"
    ],
    highlights: ["Warm home support", "Flexible arrangements", "Peace of mind"],
    audience: "Families, busy homes, parents, elderly loved ones, and private residences",
    process: "We review the home routine, care needs, living arrangement, and level of experience required before guidance.",
    assurance: "Every request is treated with care, privacy, and respect for the comfort of the people in the home."
  },
  {
    slug: "general-service",
    title: "General Domestic Service",
    shortTitle: "General Service",
    summary: "Not sure which category fits? Share your need and the team will guide you.",
    detail:
      "For household, hospitality, or support needs that do not fit neatly into one category, Domestic Staffing Hub helps you find the right next step.",
    image: "/images/services/general-service.png",
    imagePosition: "center 22%",
    accent: "from-brand-blue/20 via-white to-brand-gold/20",
    icon: Home,
    services: [
      "Household support requests",
      "Hospitality support",
      "Short-term staffing needs",
      "Custom service matching"
    ],
    promise: [
      "Guided service selection",
      "Flexible support options",
      "Responsive team follow-up",
      "Tailored recommendations"
    ],
    highlights: ["Personal guidance", "Broad support", "Easy request flow"],
    audience: "Clients with custom domestic, hospitality, or short-term support needs",
    process: "Share the support you need in plain terms, and the team will help place it under the right service path.",
    assurance: "You get a simpler starting point when the request does not fit neatly into one category."
  }
] as const;

export const serviceOptions = services.map((service) => ({
  label: service.title,
  value: service.slug
}));

export const seekerCategories = [
  ...serviceOptions
] as const;

export const stats = [
  { value: "5", label: "Service paths" },
  { value: "24h", label: "Prompt follow-up" },
  { value: "Support team", label: "" }
] as const;

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Request", href: "#request" },
  { label: "Contact", href: "#contact" }
] as const;

export const companyStory = {
  intro:
    "Domestic Staffing Hub connects families, homes, and businesses with reliable domestic support handled with care, discretion, and professionalism.",
  mission:
    "To make trusted domestic staffing easier for clients by guiding each request with clarity, respect, and dependable follow-up.",
  vision:
    "To become a trusted name for domestic support in Warri and beyond, known for quality people, peace of mind, and service that feels personal.",
  values: ["Trust", "Care", "Professional service", "Peace of mind"]
} as const;

export const jobSeekerFeature = {
  icon: BriefcaseBusiness,
  title: "Work with Domestic Staffing Hub",
  description:
    "A private path for professionals who want to offer their skills through the company."
};

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
