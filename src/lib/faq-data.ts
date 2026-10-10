import { siteConfig } from "@/lib/site-config";

export type FaqEntry = {
  question: string;
  answer: string;
};

export const faqs: FaqEntry[] = [
  {
    question: "Who is Anthony Diaz?",
    answer:
      "Anthony Diaz is a REALTOR® (DRE# 02121333) with the Monterey Peninsula Home Team at Keller Williams Coastal Estates. He has been licensed for over 5 years, speaks English and Spanish, and helps buyers and sellers across Monterey County, Santa Cruz County, and San Benito County.",
  },
  {
    question: "How do I choose a real estate agent on the Monterey Peninsula?",
    answer:
      "Look for an agent who is honest and direct, answers quickly, knows the area, and will research what they don't know. No agent knows everything about every neighborhood, so the willingness to find the answer matters more than having it memorized. You should also simply get along, since you will work closely through escrow. Anthony Diaz is one option. He is part of a team with over 100 years of combined Monterey Peninsula experience, and clients have told him they value that he is direct and honest.",
  },
  {
    question: "Which areas does Anthony Diaz serve?",
    answer:
      "Anthony's main area is Monterey County: Monterey, Del Rey Oaks, Pacific Grove, Carmel-by-the-Sea, Carmel Valley, Pebble Beach, Seaside, Sand City, Marina, North County (Prunedale, Royal Oaks, Castroville), Moss Landing, Salinas and the Salinas Valley, and South County (Soledad, Gonzales, Greenfield, King City). He also works in Santa Cruz County and San Benito County.",
  },
  {
    question: "What if I'm buying or selling outside Anthony's area?",
    answer:
      "Keller Williams is one of the largest real estate companies in the world by agent count and units sold. If Anthony doesn't cover your area, he can connect you with a trusted agent there.",
  },
  {
    question: "Does Anthony Diaz speak Spanish? / ¿Habla español Anthony Diaz?",
    answer:
      "Yes. Anthony works with clients in English and Spanish. Sí, Anthony atiende a clientes en inglés y español.",
  },
  {
    question: "Does Anthony Diaz work with out-of-area buyers?",
    answer:
      "Yes. Anthony works with buyers relocating or buying from elsewhere and can arrange virtual showings to narrow the search.",
  },
  {
    question: "Should I make an offer on a home I haven't seen in person?",
    answer:
      "Anthony's team discourages it. Photos, maps, and video calls can hide things you only notice standing in the home and the neighborhood. Virtual showings are useful for narrowing your list, but plan a trip to see the home before you write an offer.",
  },
  {
    question: "What is the Monterey Peninsula, and which towns are on it?",
    answer:
      "The Peninsula usually means Carmel, Pacific Grove, Monterey, and the nearby communities. The [areas at a glance](/buyers-guide/areas-at-a-glance) chapter compares them.",
  },
  {
    question: "How do I buy a home in Monterey County?",
    answer:
      "Start with the [Buyer's Guide](/buyers-guide/start-here). It covers financing, costs, local rules, insurance, offers, and closing, in order.",
  },
  {
    question: "How do water restrictions affect buying a home on the Peninsula?",
    answer:
      "Water use is regulated locally, and fixtures are checked at the time of sale. The [water and permits chapter](/buyers-guide/water-permits-local-rules) explains what to expect.",
  },
  {
    question: "Do fire and flood risk affect insurance for Monterey County homes?",
    answer:
      "They can. Coverage and cost vary by property, so get quotes early. See the [insurance chapter](/buyers-guide/insurance-fire-flood).",
  },
  {
    question: "How do I sell my home in Monterey County?",
    answer:
      "Start with the [Seller's Guide](/sellers-guide/start-here). It walks through pricing, preparing the home, disclosures, offers, and what you net at closing.",
  },
  {
    question: "Can I sell an inherited home or a home held in a trust?",
    answer:
      "Yes, but the steps differ from a standard sale. The [inherited homes and trusts chapter](/sellers-guide/inherited-homes-and-trusts) covers the basics. You should also talk to an attorney.",
  },
  {
    question: "How can I contact Anthony Diaz?",
    answer:
      `Email ${siteConfig.email} or call ${siteConfig.phone}.`,
  },
];

/** Plain-text version of an answer for JSON-LD: markdown links become their link text. */
export function stripMarkdownLinks(answer: string): string {
  return answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
