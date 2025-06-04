import { RequestHandler } from 'express';
import TrellisService from '../services/trellisService';

// Get all cases with optional filters
export const getJudgeDetail: RequestHandler = async (req, res) => {
  try {
    const trellisService = TrellisService.getInstance();
    const judgeDetails = await trellisService.getJudge(req.params.judgeId);
    if (!judgeDetails) {
      res.status(404).json({ error: 'Judge not found' });
      return;
    }
    return res.json(judgeDetails);
  } catch (error: any) {
    console.error('Error in GET Judge Details:', error.message);
    return res.status(500).json({ error: 'Failed to fetch judge details' });
  }
};

// Get specific case details
export const getPartyDetail: RequestHandler = async (req, res) => {
  try {
    const trellisService = TrellisService.getInstance();
    const caseDetails = await trellisService.getParties(req.params.partyId);
    if (!caseDetails) {
      res.status(404).json({ error: 'Party not found' });
      return;
    }
    return res.json(caseDetails);
  } catch (error: any) {
    console.error('Error in GET Party Details:', error.message);
    return res.status(500).json({ error: 'Failed to fetch party details' });
  }
}; 