// With two root layouts (English and Spanish) there is no single layout to wrap unmatched URLs,
// so this renders the English 404 inside the English shell. Segment-level notFound() calls use
// (en)/not-found.tsx and (es)/not-found.tsx instead.
import type { Metadata } from "next";
import "./globals.css";
import { RootShell } from "@/components/root-shell";
import NotFound from "./(en)/not-found";

export const metadata: Metadata = {
  title: "404 | Anthony Diaz",
};

export default function GlobalNotFound() {
  return (
    <RootShell lang="en">
      <NotFound />
    </RootShell>
  );
}
