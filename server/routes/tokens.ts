import express from 'express';
import { getJudgeDetail, getPartyDetail } from '../controllers/tokenController';

const router = express.Router();

router.get('/judge/:judgeId', getJudgeDetail);
router.get('/parties/:partyId', getPartyDetail);

export default router; 