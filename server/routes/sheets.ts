import express from 'express';
import { getAllRows, appendRow, updateRow } from '../controllers/sheetsController';

const router = express.Router();

router.get('/', getAllRows);
router.post('/', appendRow);
router.put('/:rowIndex', updateRow);

export default router; 