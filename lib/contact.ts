export const contact = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2347046930882",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "0704 693 0882",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@domesticstaffinghub.com",
  socials: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/domestic_staffinghub?igsh=b3kyNDc0MDR2enI0",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/mopncleann",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || ""
  }
};

export const demoContactValues = new Set([
  "",
  "2348000000000",
  "+234 800 000 0000",
  "hello@example.com",
  "https://instagram.com/example",
  "https://facebook.com/example",
  "https://linkedin.com/company/example"
]);

export function isDemoValue(value: string) {
  return demoContactValues.has(value);
}

export function createWhatsAppLink(number: string, message: string) {
  const normalized = number.replace(/[^\d]/g, "");
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
