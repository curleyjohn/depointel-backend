import { RequestHandler } from 'express';
import TrellisService from '../services/trellisService';
import { appendToSheet } from '../services/sheetsService';

// Get all cases with optional filters
export const getAllCases: RequestHandler = async (req, res) => {
  try {
    const trellisService = TrellisService.getInstance();
    const { query, page, page_size, sort_by, sort_order } = req.body;

    const searchParams = {
      query: 'uber AND (negligen* OR dismiss*)',
      state: query.jurisdiction,
      sort: '-filing_date',
      filters: {
        datestart: query.date_filed_from,
        dateend: query.date_filed_to,
      }
    };

    const ret = await trellisService.getCases(searchParams);

    // Upload to Google Sheets
    try {
      await appendToSheet(ret.cases);
      console.log(`Uploaded ${ret.cases.length} cases to Google Sheets`);
    } catch (sheetsError) {
      console.error('Error uploading to Google Sheets:', sheetsError);
      // Continue with the response even if sheets upload fails
    }

    return res.status(200).json(ret.cases);
  } catch (error: any) {
    console.error('Error in POST /cases:', error.message);
    return res.status(500).json({ error: 'Failed to fetch cases' });
  }
};

// Get specific case details
export const getCaseDetails: RequestHandler = async (req, res) => {
  try {
    const trellisService = TrellisService.getInstance();
    const caseDetails = await trellisService.getCaseDetails(req.params.caseId);
    if (!caseDetails) {
      res.status(404).json({ error: 'Case not found' });
      return;
    }
    return res.json(caseDetails);
  } catch (error: any) {
    console.error('Error in GET /cases/:caseId:', error.message);
    return res.status(500).json({ error: 'Failed to fetch case details' });
  }
}; 