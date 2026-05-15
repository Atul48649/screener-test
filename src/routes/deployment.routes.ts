import { Router } from 'express';
import { createDeployment, getDeployment, terminateDeployment } from '../controllers/deployment.controller';
import asyncHandler from '../middleware/async-handler';

const router = Router();

router.post('/', asyncHandler(createDeployment));
router.get('/:id', asyncHandler(getDeployment));
router.delete('/:id', asyncHandler(terminateDeployment));

export default router;