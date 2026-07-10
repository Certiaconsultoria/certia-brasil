import { customerDiagnosisEmail } from "@/emails/customerDiagnosisEmail";
import { internalLeadEmail } from "@/emails/internalLeadEmail";
import type { DiagnosisInput } from "@/schemas/diagnosisSchema";

type DiagnosisResult = {
  score: number;
  level: string;
  message: string;
};

type SendEmailResult =
  | { status: "sent"; customerEmailId?: string; internalEmailId?: string }
  | { status: "skipped"; reason: string }
  | { status: "failed"; reason: string };

export async function sendDiagnosisEmails(
  input: DiagnosisInput,
  diagnosis: DiagnosisResult,
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const internalTo = process.env.RESEND_INTERNAL_TO;

  if (!apiKey || !from || !internalTo) {
    return {
      status: "skipped",
      reason:
        "Envios de e-mail não configurados. Defina RESEND_API_KEY, RESEND_FROM_EMAIL e RESEND_INTERNAL_TO.",
    };
  }

  const customer = customerDiagnosisEmail(input, diagnosis);
  const internal = internalLeadEmail(input, diagnosis);

  const [customerResponse, internalResponse] = await Promise.all([
    sendResendEmail({
      apiKey,
      from,
      to: input.email,
      subject: customer.subject,
      html: customer.html,
    }),
    sendResendEmail({
      apiKey,
      from,
      to: internalTo,
      subject: internal.subject,
      html: internal.html,
      text: internal.text,
    }),
  ]);

  if (!customerResponse.ok || !internalResponse.ok) {
    return {
      status: "failed",
      reason: [
        !customerResponse.ok ? `Cliente: ${customerResponse.error}` : null,
        !internalResponse.ok ? `Interno: ${internalResponse.error}` : null,
      ]
        .filter(Boolean)
        .join(" | "),
    };
  }

  return {
    status: "sent",
    customerEmailId: customerResponse.id,
    internalEmailId: internalResponse.id,
  };
}

async function sendResendEmail({
  apiKey,
  from,
  to,
  subject,
  html,
  text,
}: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    return {
      ok: false as const,
      error: `Resend retornou ${response.status}: ${body}`,
    };
  }

  const payload = (await response.json()) as { id?: string };

  return {
    ok: true as const,
    id: payload.id,
  };
}
