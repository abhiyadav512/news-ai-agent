import Twilio from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = Twilio(accountSid, authToken);
import dotenv from "dotenv";
dotenv.config();

const from = process.env.TWILIO_WHATSAPP_FROM;
const to = process.env.WHATSAPP_TO;

export async function sendWhatsappMessages(body) {
  if (!from || !to) throw new Error("WhatsApp TWILIO numbers not configured");

  // Twilio message
  const msg = await client.messages.create({
    body,
    from,
    to,
  });
  return msg;
}
