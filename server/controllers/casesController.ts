import { RequestHandler } from 'express';
import TrellisService from '../services/trellisService';

// Get all cases with optional filters
export const getAllCases: RequestHandler = async (req, res) => {
  try {
    const trellisService = TrellisService.getInstance();
    const { query, page, page_size, sort_by, sort_order } = req.body;

    console.log(req.body);

    const searchParams = {
      query: 'uber AND (negligen* OR dismiss*)',
      state: query.jurisdiction,
      sort: '-filing_date',
      filters: {
        datestart: '2023-01-01',
        dateend: '2023-03-01',
      }
    };

    const ret = await trellisService.getCases(searchParams);
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