# Google Sheets Webhook

## O que este projeto envia

Quando `GOOGLE_SHEETS_WEBHOOK_URL` estiver configurada, o backend envia um `POST` JSON com este formato:

```json
{
  "nome": "Maria Silva",
  "cargo": "Gerente de exportacao",
  "email": "maria@exemplo.com",
  "whatsapp": "5561999999999",
  "empresa": "Fazenda Exemplo",
  "estado": "DF",
  "produto": "cafe",
  "area_total": "501_2000",
  "destino_producao": "uniao_europeia",
  "documentos_em_dia": ["car", "ccir", "itr"],
  "situacao_car": "em_ajuste",
  "georreferenciamento": "parcial",
  "volume_anual": "2001_10000",
  "contrato_exportacao": "embarque_90_dias",
  "objetivo_principal": "acessar_premium_europeu",
  "observacoes": "Precisa exportar em breve",
  "aceite": true,
  "diagnosis": {
    "score": 5,
    "level": "Bom potencial com gargalos relevantes",
    "message": "..."
  },
  "submittedAt": "2026-07-10T18:00:00.000Z"
}
```

## Como criar o webhook no Google Sheets

1. Crie uma planilha no Google Sheets.
2. Abra `Extensoes > Apps Script`.
3. Apague o conteúdo inicial.
4. Cole o arquivo [scripts/google-sheets-webhook.gs](/home/carla/repos/pessoal/certia-brasil/scripts/google-sheets-webhook.gs:1).
5. Em `Project Settings > Script properties`, cadastre:
   - `SPREADSHEET_ID`: o ID da planilha
   - `SHEET_NAME`: `Leads` ou outro nome desejado
   - `WEBHOOK_SECRET`: um segredo forte
6. Clique em `Deploy > New deployment`.
7. Escolha `Web app`.
8. Execute como `Me`.
9. Em acesso, escolha `Anyone` ou `Anyone with the link`, conforme sua política.
10. Copie a URL gerada.

## Como configurar no projeto

No ambiente da Vercel:

- `GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec`
- `GOOGLE_SHEETS_WEBHOOK_SECRET=seu-segredo`

## Observação de segurança

O projeto envia o segredo como query string no webhook. Para isso, a URL chamada fica:

`GOOGLE_SHEETS_WEBHOOK_URL?secret=...`

Se você quiser endurecer isso depois, podemos mudar para um header assinado.
