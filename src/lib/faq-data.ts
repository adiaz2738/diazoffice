import { siteConfig } from "@/lib/site-config";

export type FaqEntry = {
  question: string;
  answer: string;
};

export const faqs: FaqEntry[] = [
  {
    question: "Who is Anthony Diaz?",
    answer:
      "I'm a REALTOR with the Monterey Peninsula Home Team at Keller Williams Coastal Estates, a team with over 100 years of combined Monterey Peninsula real estate experience. What sets my own approach apart is that I write about the history behind the towns I sell in, from Carmel's cottages to Cannery Row.",
  },
  {
    question: "What areas of Monterey County do you work in?",
    answer:
      "Carmel-by-the-Sea, Monterey, Pacific Grove, Moss Landing, and Salinas.",
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
    answer: "Yes, I work with both buyers and sellers.",
  },
  {
    question: "What real estate team is Anthony Diaz part of?",
    answer:
      "Anthony Diaz is part of the Monterey Peninsula Home Team at Keller Williams Coastal Estates, a team with over 100 years of combined Monterey Peninsula real estate experience.",
  },
  {
    question: "How can I contact you?",
    answer: `Email ${siteConfig.email} or call ${siteConfig.phone}.`,
  },
];
