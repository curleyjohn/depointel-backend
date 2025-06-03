import express from 'express';
import { getAllCases, getCaseDetails } from '../controllers/casesController';

const router = express.Router();

router.post('/', getAllCases);
router.get('/:caseId', getCaseDetails);

export default router; 