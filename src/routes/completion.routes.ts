import { Router } from 'express';
import { handleCompletion } from "../controllers/completion.controller";
import asyncHandler from '../middleware/async-handler';
import completionRateLimiter from '../middleware/rate-limit.middleware';

const router = Router();

router.post('/:deployment_id/completions', completionRateLimiter, asyncHandler(handleCompletion));

export default router;