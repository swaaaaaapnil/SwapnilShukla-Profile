"use server";

import twilio from "twilio";

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_FROM,
  OWNER_WHATSAPP
} = process.env;

let client = null;
if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
  client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
}

export async function sendContact(formData) {
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();
  const honey = formData.get("company"); // honeypot

  if (honey) return { ok: true };
  if (!email || !message) return { ok:false, error:"Missing fields." };

  if (!client || !TWILIO_WHATSAPP_FROM || !OWNER_WHATSAPP) {
    return { ok:false, error:"WhatsApp not configured." };
  }

  const body = `Portfolio Contact\nFrom: ${email}\n\n${message}`.slice(0, 1500);

  try {
    await client.messages.create({
      from: TWILIO_WHATSAPP_FROM,
      to: OWNER_WHATSAPP,
      body
    });
    return { ok:true };
  } catch (e) {
    console.error("[sendContact][Twilio] Error:", e);
    return { ok:false, error:"Send failed." };
  }
}