import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactFormSchema, PHOTO_LIMITS } from "@/lib/contact-schema";
import { contactInfo } from "@/lib/site-data";

export const runtime = "nodejs";

const { SMTP_USER, GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, CONTACT_TO } = process.env;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  if (!SMTP_USER || !GMAIL_CLIENT_ID || !GMAIL_CLIENT_SECRET || !GMAIL_REFRESH_TOKEN) {
    console.error("Contact form: Gmail OAuth2 env vars are not configured.");
    return NextResponse.json({ error: "Service d'envoi indisponible." }, { status: 500 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if ((formData.get("website") as string | null)?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactFormSchema.safeParse({
    nom: formData.get("nom"),
    email: formData.get("email"),
    telCountry: formData.get("telCountry"),
    tel: formData.get("tel") ?? "",
    service: formData.get("service"),
    msg: formData.get("msg") ?? "",
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Formulaire invalide." }, { status: 422 });
  }

  const { nom, email, telCountry, tel, service, msg } = parsed.data;

  const photos = formData.getAll("photos").filter((p): p is File => p instanceof File);
  if (photos.length > PHOTO_LIMITS.maxCount) {
    return NextResponse.json({ error: "Trop de photos jointes." }, { status: 422 });
  }
  const attachments = [];
  for (const photo of photos) {
    if (photo.size === 0) continue;
    if (!PHOTO_LIMITS.acceptedTypes.includes(photo.type as (typeof PHOTO_LIMITS.acceptedTypes)[number])) {
      return NextResponse.json({ error: "Format de photo non accepté." }, { status: 422 });
    }
    if (photo.size > PHOTO_LIMITS.maxSize) {
      return NextResponse.json({ error: "Une photo dépasse 5 Mo." }, { status: 422 });
    }
    attachments.push({
      filename: photo.name || "photo",
      content: Buffer.from(await photo.arrayBuffer()),
      contentType: photo.type,
    });
  }

  const phone = tel ? `${telCountry} ${tel}` : "Non renseigné";
  const message = msg?.trim() ? msg.trim() : "Aucun message.";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SMTP_USER,
      clientId: GMAIL_CLIENT_ID,
      clientSecret: GMAIL_CLIENT_SECRET,
      refreshToken: GMAIL_REFRESH_TOKEN,
    },
  });

  try {
    await transporter.sendMail({
      from: `Site Élégance Paysage <${SMTP_USER}>`,
      to: CONTACT_TO || contactInfo.email,
      replyTo: `${nom} <${email}>`,
      subject: `Nouvelle demande — ${service} — ${nom}`,
      text: [
        `Nom      : ${nom}`,
        `Email    : ${email}`,
        `Téléphone: ${phone}`,
        `Demande  : ${service}`,
        "",
        "Message :",
        message,
        "",
        attachments.length ? `${attachments.length} photo(s) jointe(s).` : "Aucune photo jointe.",
      ].join("\n"),
      html: `
        <h2 style="margin:0 0 12px">Nouvelle demande de contact</h2>
        <table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">
          <tr><td style="padding:4px 12px 4px 0"><strong>Nom</strong></td><td>${escapeHtml(nom)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><strong>Email</strong></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:4px 12px 4px 0"><strong>Téléphone</strong></td><td>${escapeHtml(phone)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><strong>Type de demande</strong></td><td>${escapeHtml(service)}</td></tr>
        </table>
        <p style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px"><strong>Message :</strong><br>${escapeHtml(message)}</p>
        <p style="font-family:system-ui,sans-serif;font-size:13px;color:#666">${
          attachments.length ? `${attachments.length} photo(s) jointe(s).` : "Aucune photo jointe."
        }</p>
      `,
      attachments,
    });
  } catch (error) {
    console.error("Contact form: sendMail failed", error);
    return NextResponse.json({ error: "L'envoi a échoué. Réessayez plus tard." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
