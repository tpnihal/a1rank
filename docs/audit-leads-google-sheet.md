# Saving audit leads to a Google Sheet

Every time a visitor runs the free website audit, the site adds one row to a Google Sheet:
date, email, WhatsApp number (if given), website, mobile scores, desktop scores, audit status and consent.

## One-time setup

1. Create a new Google Sheet, for example "A1 Rank audit leads".
2. In the sheet, open **Extensions > Apps Script**. Delete the sample code and paste the script below. Save.
3. Click **Deploy > New deployment**. Choose type **Web app**. Set **Execute as: Me** and
   **Who has access: Anyone**. Click **Deploy** and approve the permission prompt.
4. Copy the **Web app URL**. Anyone who has this address can add rows, so keep it private.
5. In Hostinger hPanel, open the website, then **Environment variables**, and add
   `LEAD_WEBHOOK_URL` with that address as the value. Redeploy or restart the app.

## Script

```js
// Text that starts with = + - or @ is stored as plain text, never as a formula.
function safe(v) {
  v = String(v == null ? "" : v);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Date", "Email", "WhatsApp", "Website", "Mobile scores", "Desktop scores", "Audit", "Consent"]);
  }
  sheet.appendRow([new Date(), safe(d.email), safe(d.phone), safe(d.url), safe(d.mobile), safe(d.desktop), safe(d.status), safe(d.consent)]);
  return ContentService.createTextOutput("ok");
}
```

If the script is changed later, use **Deploy > Manage deployments > Edit > New version** so the address stays the same.
