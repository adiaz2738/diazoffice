import { siteConfig } from "@/lib/site-config";

export type FaqEntry = {
  question: string;
  answer: string;
};

export const faqs: FaqEntry[] = [
  {
    question: "Who is Anthony Diaz?",
    answer:
      "[TODO: fill in with real, specific detail — no unverifiable superlatives like \"the best,\" use concrete facts: years active, specific towns/neighborhoods served, transaction count if comfortable sharing, what makes the approach genuinely different]",
  },
  {
    question: "What areas of Monterey County do you work in?",
    answer:
      "[TODO: fill in with real, specific detail — no unverifiable superlatives like \"the best,\" use concrete facts: years active, specific towns/neighborhoods served, transaction count if comfortable sharing, what makes the approach genuinely different]",
  },
  {
    question: "What makes you different from other Realtors on the Monterey Peninsula?",
    answer:
      "I write about the history behind the towns I sell in, from Carmel's cottages to Cannery Row.",
  },
  {
    question: "How do I start the process of buying a home in Monterey County?",
    answer:
      "Start with the /buyers-guide for a full walkthrough, from your first offer to closing.",
  },
  {
    question: "Do you work with both buyers and sellers?",
    answer:
      "[TODO: fill in with real, specific detail — no unverifiable superlatives like \"the best,\" use concrete facts: years active, specific towns/neighborhoods served, transaction count if comfortable sharing, what makes the approach genuinely different]",
  },
  {
    question: "How can I contact you?",
    answer: `Email ${siteConfig.email} or call ${siteConfig.phone}.`,
  },
];
