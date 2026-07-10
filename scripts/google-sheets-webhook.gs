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
      payload.email || "",
      payload.whatsapp || "",
      payload.empresa || "",
      payload.cidade || "",
      payload.estado || "",
      payload.produto || "",
      payload.prazo_adequacao || "",
      boolToLabel(payload.possui_car),
      boolToLabel(payload.possui_georef),
      boolToLabel(payload.exporta_ue),
      boolToLabel(payload.tem_doc_cadeia),
      boolToLabel(payload.tem_hist_ambiental),
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
    "email",
    "whatsapp",
    "empresa",
    "cidade",
    "estado",
    "produto",
    "prazo_adequacao",
    "possui_car",
    "possui_georef",
    "exporta_ue",
    "tem_doc_cadeia",
    "tem_hist_ambiental",
    "observacoes",
    "diagnosis_level",
    "diagnosis_score",
    "diagnosis_message"
  ]);
}

function boolToLabel(value) {
  return value ? "Sim" : "Não";
}
