import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// Load the service account credentials
const auth = new google.auth.GoogleAuth({
  credentials: {
    type: 'service_account',
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    client_id: process.env.GOOGLE_CLIENT_ID,
    universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
    project_id: process.env.GOOGLE_PROJECT_ID,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export async function appendToSheet(cases: any[]) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client as any });

  const spreadsheetId = process.env.GOOGLE_SHEETS_ID || '';
  const range = 'Sheet1!A1';

  // Map cases to rows
  const values = cases.map(case_ => [
    case_.name || '',
    case_.case || '',
    case_.court_type || '',
    case_.county || '',
    case_.state || '',
    case_.filing_date || '',
    case_.status || '',
    case_.case_token || '',
    case_.type || '',
    case_.category || '',
    case_.practice_area || '',
    case_.matter_type || '',
    case_.case_outcome_type || '',
    case_.verdict || '',
    case_.time_to_first_cmc || '',
    case_.time_to_first_dismissal || '',
    case_.case_cycle_time || '',
    case_.case_last_updated || '',
    case_.last_refreshed || '',
    case_.is_federal ? 'Yes' : 'No',
    case_.raw_causes_of_action || '',
    case_.complaint_overview || ''
  ]);

  try {
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values
      }
    });
    console.log(`${result.data.updates?.updatedCells} cells appended.`);
    return result.data;
  } catch (err) {
    console.error('Error appending to Google Sheets:', err);
    throw err;
  }
}

const SheetService = {
  appendToSheet
};

export default SheetService;
