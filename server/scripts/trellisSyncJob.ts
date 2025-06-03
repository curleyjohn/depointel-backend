import dotenv from 'dotenv';
import TrellisService from '../services/trellisService';
import SheetsService from '../services/sheetsService';

// Load environment variables
dotenv.config();

const jurisdictions = [
  'Ohio',
  'Indiana',
  'Illinois',
  'Iowa',
  'Michigan',
  'Missouri',
  'Kansas',
  'Minnesota',
  'Wisconsin'
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
      const cases = await trellisService.getCases({
        query: {
          jurisdiction,
          case_type: 'civil',
          status: 'active'
        },
        page: 1,
        page_size: 100,
        sort_by: 'date_filed',
        sort_order: 'desc'
      });
      // Only sync multiparty cases
      const multipartyCases = cases.filter(c => Array.isArray(c.parties) && c.parties.length > 2);
      const rows = multipartyCases.map(case_ => [
        case_.id,
        case_.title,
        case_.court,
        case_.date,
        case_.status,
        case_.jurisdiction,
        case_.judge,
        case_.parties.join(', '),
        case_.case_type,
        case_.last_updated
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