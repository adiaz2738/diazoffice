import { GuideHub, guideHubMetadata } from "@/lib/es-pages";

export const metadata = guideHubMetadata("sellers-guide");

export default function Page() {
  return <GuideHub category="sellers-guide" />;
}
