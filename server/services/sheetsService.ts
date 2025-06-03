import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

interface SheetsServiceConfig {
  spreadsheetId: string;
  credentials: string;
}

class SheetsService {
  private sheets;
  private spreadsheetId: string;

  constructor(config: SheetsServiceConfig) {
    this.spreadsheetId = config.spreadsheetId;

    // Initialize auth client with credentials
    const auth = new JWT({
      keyFile: config.credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    // Initialize sheets client with auth
    this.sheets = google.sheets({ version: 'v4', auth });
  }

  async appendRow(data: any[]) {
    try {
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A:Z', // Adjust based on your sheet structure
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [data]
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error appending to Google Sheets:', error);
      throw error;
    }
  }

  async getRows() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A:Z' // Adjust based on your sheet structure
      });
      return response.data.values;
    } catch (error) {
      console.error('Error reading from Google Sheets:', error);
      throw error;
    }
  }

  async updateRow(rowIndex: number, data: any[]) {
    try {
      const response = await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `Sheet1!A${rowIndex}:Z${rowIndex}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [data]
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating Google Sheets:', error);
      throw error;
    }
  }
}

export default SheetsService; 