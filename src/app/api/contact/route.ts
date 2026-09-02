import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.name !== "string" || typeof body.email !== "string" || typeof body.message !== "string") {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { name, email, phone, message } = body;

  if (!name.trim() || !email.trim() || !message.trim()) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const { error } = await supabase.from("contact_submissions").insert({
    name: name.trim(),
    email: email.trim(),
    phone: typeof phone === "string" ? phone.trim() : null,
    message: message.trim(),
  });

  if (error) {
    console.error("Supabase insert error (contact_submissions):", error.message);
    return NextResponse.json(
      { error: "Couldn't save your message. Please try again or email directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
