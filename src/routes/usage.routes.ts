import { Router } from 'express';
import { handleGetUsage } from '../controllers/usage.controller';
import asyncHandler from '../middleware/async-handler';

const router = Router();

router.get('/', asyncHandler(handleGetUsage));

export default router;