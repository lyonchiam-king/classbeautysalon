import { ServiceItem, ReviewItem } from '../types';

import heroImg from '../assets/images/hero_salon_interior_1788960107002.jpg';
import threadingImg from '../assets/images/eyebrow_threading_work_1788960122191.jpg';
import layersImg from '../assets/images/layers_cut_styling_1788960140074.jpg';
import highlightsImg from '../assets/images/highlights_treatment_1788960156078.jpg';

export const SALON_INFO = {
  name: "Class Beauty Salon",
  tagline: "Precise cuts and threading in the heart of Withington.",
  subcopy: "Friendly staff, fair prices, and a relaxing atmosphere on Burton Rd.",
  phone: "+44 7440 391599",
  phoneRaw: "+447440391599",
  whatsappUrl: "https://wa.me/447440391599?text=Hello%20Class%20Beauty%20Salon,%20I'd%20like%20to%20book%20an%20appointment.",
  address: "12 Burton Rd, Withington, Manchester M20 3ED, UK",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Class+beauty+salon+12+Burton+Rd+Withington+Manchester+M20+3ED",
  heroImage: heroImg,
  hours: [
    { days: "Monday - Saturday", time: "9:30 AM - 6:00 PM" },
    { days: "Sunday", time: "10:00 AM - 4:00 PM" }
  ]
};

export const BADGE_HIGHLIGHTS = [
  { label: "Friendly Staff", icon: "smile" },
  { label: "Relaxing Atmosphere", icon: "sparkles" },
  { label: "Fair Pricing", icon: "tag" }
];

export const WHAT_THEY_OFFER: ServiceItem[] = [
  {
    id: "layers-cut",
    name: "Layers Cut",
    category: "Hair",
    tags: ["Shape", "Volume"],
    price: "£28.00",
    priceNumeric: 28,
    shortDesc: "Custom shape and bouncy volume tailored to your hair type.",
    fullDesc: "Expert precision cut adding movement, volume, and soft framing layers. Perfect for long or medium hair looking for weightless texture.",
    duration: "45 mins",
    image: layersImg,
    featuredOrder: 1
  },
  {
    id: "eyebrow-threading",
    name: "Eyebrow Threading",
    category: "Brows",
    tags: ["Precision", "Clean"],
    price: "£8.00",
    priceNumeric: 8,
    shortDesc: "Gentle, accurate threading for perfectly defined arch lines.",
    fullDesc: "Our signature Withington service. Using 100% organic cotton thread, our experienced therapists map and shape your eyebrows with crisp precision.",
    duration: "15 mins",
    image: threadingImg,
    featuredOrder: 2
  },
  {
    id: "highlights",
    name: "Highlights",
    category: "Hair",
    tags: ["Dimension", "Care"],
    price: "£55.00",
    priceNumeric: 55,
    shortDesc: "Rich, multi-tonal highlights crafted with nourishing bond care.",
    fullDesc: "Subtle or vibrant dimensional highlights placed with care to suit your complexion. Includes toner and conditioning finish.",
    duration: "120 mins",
    image: highlightsImg,
    featuredOrder: 3
  },
  {
    id: "hair-treatment",
    name: "Hair Treatment",
    category: "Hair",
    tags: ["Restore", "Shine"],
    price: "£22.00",
    priceNumeric: 22,
    shortDesc: "Deep restorative conditioning for silky softness and natural shine.",
    fullDesc: "Intensive moisture mask and scalp massage that restores dry or heat-styled hair, leaving it silky, manageable, and full of natural radiance.",
    duration: "30 mins",
    image: highlightsImg,
    featuredOrder: 4
  }
];

export const ADDITIONAL_SERVICES: ServiceItem[] = [
  {
    id: "wash-blowdry",
    name: "Wash, Cut & Blowdry",
    category: "Hair",
    tags: ["Styling", "Full Service"],
    price: "£32.00",
    priceNumeric: 32,
    shortDesc: "Relaxing wash with scalp massage, cut, and polished blowdry finish.",
    fullDesc: "Complete pampering service starting with a soothing shampoo wash, custom haircut, and professionally styled blowdry.",
    duration: "50 mins",
    image: layersImg
  },
  {
    id: "dry-trim",
    name: "Dry Trim & Split Ends",
    category: "Hair",
    tags: ["Quick", "Maintenance"],
    price: "£18.00",
    priceNumeric: 18,
    shortDesc: "Quick split end trim to keep your hair healthy between full cuts.",
    fullDesc: "Fast and tidy dry hair trim focused on tidying ends and maintaining length.",
    duration: "25 mins",
    image: layersImg
  },
  {
    id: "root-color",
    name: "Root Touch-up & Color",
    category: "Hair",
    tags: ["Color", "Coverage"],
    price: "£38.00",
    priceNumeric: 38,
    shortDesc: "Flawless grey coverage and root refresh with gentle formula.",
    fullDesc: "Seamless root color match using high quality, conditioning hair colors that protect hair health.",
    duration: "75 mins",
    image: highlightsImg
  },
  {
    id: "upper-lip-threading",
    name: "Upper Lip Threading",
    category: "Brows",
    tags: ["Quick", "Smooth"],
    price: "£5.00",
    priceNumeric: 5,
    shortDesc: "Fast and clean facial hair removal around the lip area.",
    fullDesc: "Gentle threading removal for ultra-smooth skin with zero harsh chemical irritation.",
    duration: "10 mins",
    image: threadingImg
  },
  {
    id: "full-face-threading",
    name: "Full Face Threading",
    category: "Brows",
    tags: ["Complete", "Precision"],
    price: "£20.00",
    priceNumeric: 20,
    shortDesc: "Eyebrows, lip, chin, and sideburns threading combo.",
    fullDesc: "Thorough facial threading covering all areas for clean, radiant makeup-ready skin.",
    duration: "30 mins",
    image: threadingImg
  },
  {
    id: "brow-tinting",
    name: "Eyebrow Tinting",
    category: "Brows",
    tags: ["Color", "Definition"],
    price: "£10.00",
    priceNumeric: 10,
    shortDesc: "Custom color tint for fuller, darker, more defined brows.",
    fullDesc: "Long-lasting brow tint customized to complement your hair and skin tone.",
    duration: "15 mins",
    image: threadingImg
  },
  {
    id: "brow-thread-tint-combo",
    name: "Brow Thread & Tint Combo",
    category: "Brows",
    tags: ["Best Value", "Full Brows"],
    price: "£15.00",
    priceNumeric: 15,
    shortDesc: "Complete brow transformation with precision threading and tinting.",
    fullDesc: "Our most popular brow combination! Clean shape plus rich tinting for stunning brows.",
    duration: "25 mins",
    image: threadingImg
  }
];

export const ALL_SERVICES = [...WHAT_THEY_OFFER, ...ADDITIONAL_SERVICES];

export const REVIEWS: ReviewItem[] = [
  {
    id: "1",
    author: "Sarah M.",
    location: "Burton Rd local",
    rating: 5,
    text: "Extremely friendly staff and fair prices! The eyebrow threading is so precise and clean every single time. Wouldn't go anywhere else in Withington.",
    tag: "Eyebrow Threading",
    date: "Recent Google Review"
  },
  {
    id: "2",
    author: "Emma K.",
    location: "Withington, Manchester",
    rating: 5,
    text: "Got my layers cut and blowdry done here. Relaxing atmosphere and the staff truly take their time. Great value right on Burton Rd.",
    tag: "Layers Cut",
    date: "Recent Google Review"
  },
  {
    id: "3",
    author: "Priya S.",
    location: "Manchester",
    rating: 5,
    text: "Very professional service, quick brow threading and lovely hair treatment. Fair pricing and friendly faces every time you walk in.",
    tag: "Hair Treatment",
    date: "Verified Walk-in"
  },
  {
    id: "4",
    author: "Hannah L.",
    location: "Didsbury / Withington",
    rating: 5,
    text: "Super relaxing salon, friendly staff, and fantastic results. Highly recommend for threading and haircuts in Withington!",
    tag: "Friendly Staff",
    date: "Recent Google Review"
  }
];

export const PROOF_POINTS = [
  "Friendly, professional staff",
  "Relaxing atmosphere",
  "Fair pricing",
  "Precise results"
];
