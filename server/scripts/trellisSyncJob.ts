import dotenv from 'dotenv';
import TrellisService from '../services/trellisService';
import SheetsService from '../services/sheetsService';

// Load environment variables
dotenv.config();

const jurisdictions = [
  'oh',
  'in',
  'il',
  'ia',
  'mi',
  'mo',
  'ks',
  'mn',
  'wi'
];

async function syncTrellisToSheets() {
  try {
    const trellisService = TrellisService.getInstance();
    const sheetsService = new SheetsService({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID || '',
      credentials: process.env.GOOGLE_APPLICATION_CREDENTIALS || ''
    });

    let totalSynced = 0;
    for (const jurisdiction of jurisdictions) {
      // Fetch civil litigation cases for this jurisdiction
      const caseResponse = await trellisService.getCases({
        query: jurisdiction,
        state: [jurisdiction],
        sort: 'filing_date',
        filters: {
          datestart: '', // Set as needed
          dateend: '',   // Set as needed
        }
      });
      const cases = caseResponse.cases;
      // Only sync multiparty cases
      const multipartyCases = cases.filter((c: any) => Array.isArray(c.parties?.split(',')) && c.parties.split(',').length > 2);
      const rows = multipartyCases.map((case_: any) => [
        case_.case,
        case_.name,
        case_.type,
        case_.category,
        case_.state,
        case_.county,
        case_.parties,
        case_.events,
        case_.filing_date,
        case_.last_refreshed,
        case_.practice_area,
        case_.filing_courthouse,
        case_.matter_type,
        case_.case_outcome_type,
        case_.case_last_updated,
        case_.case_token,
        case_.judge,
        case_.is_federal
      ]);
      for (const row of rows) {
        await sheetsService.appendRow(row);
      }
      totalSynced += rows.length;
    }
    console.log(`Successfully synced ${totalSynced} multiparty civil litigation cases to Google Sheets`);
  } catch (error: any) {
    console.error('Error syncing Trellis to Sheets:', error.message);
    throw error;
  }
}

// Run the sync job
syncTrellisToSheets().catch(console.error); 