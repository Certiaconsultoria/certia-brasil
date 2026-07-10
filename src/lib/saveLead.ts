import { leadFieldsForAirtable } from "@/lib/formatDiagnosis";
import type { DiagnosisInput } from "@/schemas/diagnosisSchema";

type DiagnosisResult = {
  score: number;
  level: string;
  message: string;
};

type SaveLeadResult =
  | { status: "saved"; provider: "airtable" | "google-sheets-webhook"; recordId?: string }
  | { status: "skipped"; reason: string }
  | { status: "failed"; reason: string };

export async function saveLead(
  input: DiagnosisInput,
  diagnosis: DiagnosisResult,
): Promise<SaveLeadResult> {
  if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID && process.env.AIRTABLE_TABLE_NAME) {
    return saveLeadToAirtable(input, diagnosis);
  }

  if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
    return saveLeadToGoogleSheetsWebhook(input, diagnosis);
  }

  return {
    status: "skipped",
    reason:
      "Nenhuma integração de leads configurada. Defina AIRTABLE_* ou GOOGLE_SHEETS_WEBHOOK_URL.",
  };
}

async function saveLeadToAirtable(
  input: DiagnosisInput,
  diagnosis: DiagnosisResult,
): Promise<SaveLeadResult> {
  const response = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${encodeURIComponent(process.env.AIRTABLE_TABLE_NAME as string)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: leadFieldsForAirtable(input, diagnosis),
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    return {
      status: "failed",
      reason: `Airtable retornou ${response.status}: ${body}`,
    };
  }

  const payload = (await response.json()) as { records?: Array<{ id: string }> };

  return {
    status: "saved",
    provider: "airtable",
    recordId: payload.records?.[0]?.id,
  };
}

async function saveLeadToGoogleSheetsWebhook(
  input: DiagnosisInput,
  diagnosis: DiagnosisResult,
): Promise<SaveLeadResult> {
  const webhookUrl = new URL(process.env.GOOGLE_SHEETS_WEBHOOK_URL as string);
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

  if (secret) {
    webhookUrl.searchParams.set("secret", secret);
  }

  const response = await fetch(webhookUrl.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...input,
      diagnosis,
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    return {
      status: "failed",
      reason: `Webhook do Google Sheets retornou ${response.status}: ${body}`,
    };
  }

  return {
    status: "saved",
    provider: "google-sheets-webhook",
  };
}
