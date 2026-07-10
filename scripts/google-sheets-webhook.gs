function doPost(e) {
  try {
    var secret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
    var providedSecret = (e && e.parameter && e.parameter.secret) || "";

    if (secret && providedSecret !== secret) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: "unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var spreadsheetId = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
    var sheetName = PropertiesService.getScriptProperties().getProperty("SHEET_NAME") || "Leads";

    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);

    ensureHeader(sheet);

    var payload = JSON.parse(e.postData.contents);
    var diagnosis = payload.diagnosis || {};

    sheet.appendRow([
      payload.submittedAt || new Date().toISOString(),
      payload.nome || "",
      payload.cargo || "",
      payload.email || "",
      payload.whatsapp || "",
      payload.empresa || "",
      payload.estado || "",
      payload.produto || "",
      payload.area_total || "",
      payload.destino_producao || "",
      listToLabel(payload.documentos_em_dia),
      payload.situacao_car || "",
      payload.georreferenciamento || "",
      payload.volume_anual || "",
      payload.contrato_exportacao || "",
      payload.objetivo_principal || "",
      payload.observacoes || "",
      diagnosis.level || "",
      diagnosis.score || "",
      diagnosis.message || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function ensureHeader(sheet) {
  if (sheet.getLastRow() > 0) return;

  sheet.appendRow([
    "submittedAt",
    "nome",
    "cargo",
    "email",
    "whatsapp",
    "empresa",
    "estado",
    "produto",
    "area_total",
    "destino_producao",
    "documentos_em_dia",
    "situacao_car",
    "georreferenciamento",
    "volume_anual",
    "contrato_exportacao",
    "objetivo_principal",
    "observacoes",
    "diagnosis_level",
    "diagnosis_score",
    "diagnosis_message"
  ]);
}

function listToLabel(value) {
  if (!Array.isArray(value)) return "";
  return value.join(", ");
}
