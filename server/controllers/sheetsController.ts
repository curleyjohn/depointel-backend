import { RequestHandler } from 'express';
import SheetsService from '../services/sheetsService';
import dotenv from 'dotenv';

dotenv.config();

const sheetsService = new SheetsService({
  spreadsheetId: process.env.GOOGLE_SHEETS_ID || '',
  credentials: process.env.GOOGLE_APPLICATION_CREDENTIALS || ''
});

// Get all rows from the sheet
export const getAllRows: RequestHandler = async (req, res) => {
  try {
    const rows = await sheetsService.getRows();
    res.json(rows);
  } catch (error) {
    console.error('Error in GET /sheets:', error);
    res.status(500).json({ error: 'Failed to fetch sheet data' });
  }
};

// Add a new row to the sheet
export const appendRow: RequestHandler = async (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      res.status(400).json({ error: 'Data must be an array' });
      return;
    }
    const result = await sheetsService.appendRow(data);
    res.json(result);
  } catch (error) {
    console.error('Error in POST /sheets:', error);
    res.status(500).json({ error: 'Failed to append data to sheet' });
  }
};

// Update a specific row
export const updateRow: RequestHandler = async (req, res) => {
  try {
    const { rowIndex } = req.params;
    const { data } = req.body;
    if (!Array.isArray(data)) {
      res.status(400).json({ error: 'Data must be an array' });
      return;
    }
    const result = await sheetsService.updateRow(parseInt(rowIndex), data);
    res.json(result);
  } catch (error) {
    console.error('Error in PUT /sheets/:rowIndex:', error);
    res.status(500).json({ error: 'Failed to update sheet data' });
  }
}; 