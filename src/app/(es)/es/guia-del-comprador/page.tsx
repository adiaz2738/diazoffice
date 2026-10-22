import { GuideHub, guideHubMetadata } from "@/lib/es-pages";

export const metadata = guideHubMetadata("buyers-guide");

export default function Page() {
  return <GuideHub category="buyers-guide" />;
}
