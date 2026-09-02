import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.email !== "string" || !body.email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: body.email.trim().toLowerCase() });

  if (error) {
    // Unique constraint violation just means they're already subscribed — treat as success.
    if (error.code === "23505") {
      return NextResponse.json({ ok: true });
    }
    console.error("Supabase insert error (newsletter_subscribers):", error.message);
    return NextResponse.json({ error: "Couldn't subscribe. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
