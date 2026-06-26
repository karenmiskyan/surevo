import { appendFile, mkdir } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";

export const runtime = "nodejs";

type LeadPayload = {
  source?: string;
  page?: string;
  store?: string;
  name?: string;
  phone?: string;
  revenue?: string;
  whatsappConsent?: boolean;
  consentText?: string;
  consentTimestamp?: string;
  consentSourcePage?: string;
};

const requiredFields: Array<keyof LeadPayload> = ["store", "name", "phone", "revenue"];

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 500) : "";
}

function normalizeLead(body: LeadPayload) {
  return {
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
    source: clean(body.source) || "audit",
    page: clean(body.page),
    store: clean(body.store),
    name: clean(body.name),
    phone: clean(body.phone),
    revenue: clean(body.revenue),
    whatsappConsent: body.whatsappConsent === true,
    consentText: clean(body.consentText),
    consentTimestamp: clean(body.consentTimestamp) || new Date().toISOString(),
    consentSourcePage: clean(body.consentSourcePage) || clean(body.page),
  };
}

function validStoreUrl(store: string) {
  try {
    const url = new URL(store.includes("://") ? store : `https://${store}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

async function persistLead(lead: ReturnType<typeof normalizeLead>) {
  const webhookUrl = process.env.SUREVO_LEAD_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;
  const leadLogPath = process.env.SUREVO_LEAD_LOG_PATH || path.join("/tmp", "surevo-leads.ndjson");

  await mkdir(path.dirname(leadLogPath), { recursive: true });
  await appendFile(leadLogPath, `${JSON.stringify(lead)}\n`, "utf8");

  if (!webhookUrl) {
    console.info("Surevo lead accepted", { id: lead.id, source: lead.source, page: lead.page });
    return { delivered: false };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error(`Lead webhook failed with ${response.status}`);
  }

  return { delivered: true };
}

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const lead = normalizeLead(body);
  const missing = requiredFields.filter((field) => !lead[field]);

  if (missing.length || !lead.whatsappConsent) {
    return Response.json({ ok: false, error: "missing_required", missing }, { status: 400 });
  }

  if (!validStoreUrl(lead.store)) {
    return Response.json({ ok: false, error: "invalid_store_url" }, { status: 400 });
  }

  const digits = lead.phone.replace(/\D/g, "");
  if (digits.length < 8) {
    return Response.json({ ok: false, error: "invalid_phone" }, { status: 400 });
  }

  try {
    const result = await persistLead(lead);
    return Response.json({ ok: true, id: lead.id, ...result });
  } catch (error) {
    console.error("Surevo lead submission failed", error);
    return Response.json({ ok: false, error: "lead_delivery_failed" }, { status: 502 });
  }
}
