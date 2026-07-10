import { Resend } from "resend";
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
        "Envio de e-mail temporariamente indisponível nesta implantação.",
    };
  }

  const resend = new Resend(apiKey);
  const sender = formatSender(from);
  const customer = customerDiagnosisEmail(input, diagnosis);
  const internal = internalLeadEmail(input, diagnosis);

  const [customerResponse, internalResponse] = await Promise.all([
    sendResendEmail({
      resend,
      from: sender,
      to: input.email,
      subject: customer.subject,
      html: customer.html,
    }),
    sendResendEmail({
      resend,
      from: sender,
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
  resend,
  from,
  to,
  subject,
  html,
  text,
}: {
  resend: Resend;
  from: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    html,
    text,
  });

  if (error) {
    return {
      ok: false as const,
      error: `Resend retornou erro: ${error.message}`,
    };
  }

  return {
    ok: true as const,
    id: data?.id,
  };
}

function formatSender(from: string) {
  if (from.includes("<") && from.includes(">")) {
    return from;
  }

  return `CERTIA Brasil <${from}>`;
}
