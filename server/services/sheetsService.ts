import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// Load the service account credentials
const auth = new google.auth.GoogleAuth({
  credentials: {
    type: 'service_account',
    client_email: 'depointel@composed-arbor-457508-i9.iam.gserviceaccount.com',
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxmP2PG/fA5Qe6\nr6+hVHu87Qv1HA1cbt+PaYgfd1s1awtbxuO+/BfWmu3y6W6ZgBZ+6QHtJiRNiVbC\naMdfu31bKkSM2DCTB6OseEnT+JfZfmrTX53HXQhAigT1P1q3W0xKhV7l2dOhxm+I\nMCWihGiK10CJdFE+NHYEMrc73PoZm4t2ccXilmJMdLRpQRD6G+z9fuRYZiYtteXy\n8Ess302bGJSQuEDNW+9VBD51oiC8jG7rYoWd5PEHVwCAAjrPplIRL48j665OPsnJ\namTX6YN2/tpW4ot2OYwynHY+lQx7zW1uh2i8jMyuyjR7BaF2eiZCqac8HVJOM3bo\nHx45rOLxAgMBAAECggEAAwNBI+UZ0BYiii5ySIaWHceYqRULffqshLKJ2lzMOY0C\nEZG/ac09e0jAChufIm/7kbYSsAryWTVf+SbNYQidcQc3x/rf4hKiWmnk+LlSHCCq\nn8DSvJ/NpMiimmVzfMJJ+kambDhEgI1M9Y65iLb9zgMmR16nhSpfKSWSGawfOwFy\n/HotWqTzEJKmluUsil3diLKV5dg4sU3VNuqJZY1XezqsoUdso9RgzjhyqqCV4JeA\nVjLDKDfZxoUxCvX45e7v15qwjCNSF6v5kk6owpF6VUG+BY2cOx4MlJ2UOBHKRIp3\nrdj8L1RwnQa7tFHarGl32aNk596jBxiVR+1saEB9RQKBgQDleyfnMBPHU8jLBjtQ\nanMEpkdnUSeIBYx0P/byAIfdTs0XrJY8eE6u/84KlDobqwmtkUrUoRxvuQTEy6Xs\nNoYBL3rnE4Un+oo5Q+5IBLjYUXId4oHLxYye6c8Cla73yhAXrSBy+TQSgABD9ujr\nKcyOQYYlsBZsJ2ig60gKj+4z5QKBgQDGHvFBdzQ1axCdyneTpk4lwAS//qPBGBhI\n8SVfXrcbbZcbCcTkcHMOV5I4d/F9Dfg1TaKiMn3I5CzqU9FCA0KP9yu6PMHjTJvt\nbU+ny/CBEZ1AVHSZ/SzLgyN+ray5X+IDEw1DZ+bQwbwgvrOncYu92+TrsnjKPEv8\nnNQ8jYDaHQKBgQCXuqpTjdJGBPvKYUBulzOda2PiyCHfKewIIRLiR7+NcEDi2lYr\nfVBpHPHaxM725Evt2xcjJ7Npm2evxwbZ++L2fbJBfwKXwGwMGQI/0/9z58YQRGeV\nl/S2Tdl12ApsA8pIHUxLOMJZSRDj3yl585UwqdpMqPTqZdQkMezcLvZMkQKBgAN0\nkLKamJ+B4YVO/azmjqBb6/lJQKPifrHu+r7iEQF6dNM05WkyiN8sKdGwTdbngnez\nhe2cQdNaH2pq0dB77BJEtk+GNb94G5QVfvknNmeZ3gs8LdhtsPVPsTPJZaTKBlAV\nafrN+hmT92r+yHVYJp7GEgUGVNL6ID0koxL3SNMFAoGAK/hwOENypInkHPsMAPep\nvYfcWiUEXMqKTYLu/rtlQsOQyhmL2xriEY23MZgaIY0SaheRqG8zEVlCcaGvbYc8\nmYI+t80OQyZuKpId+CTypCTbJ+tGyURGMRzlL7kzhBRhoRbBWkAL0wIKVg/k1OdI\n9Mkl6GzWE9cPnahyPD6Y1RY=\n-----END PRIVATE KEY-----\n",
    private_key_id: "f9325989e5201976ef97e9213d59abab50f84b43",
    client_id: "117046999347755643021",
    universe_domain: "googleapis.com",
    project_id: "composed-arbor-457508-i9",


  },

  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export async function appendToSheet() {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client as any });

  const spreadsheetId = process.env.GOOGLE_SHEETS_ID || ''; // Replace with your Google Sheet ID
  const range = 'Sheet1!A1'; // Replace with your desired range
  const values = [
    ['Name', 'Email', 'Message'],
    ['John Doe', 'john@example.com', 'Hello, world!']
  ];

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
  } catch (err) {
    console.error('The API returned an error:', err);
  }
}

const SheetService = {
  appendToSheet
};

export default SheetService;
