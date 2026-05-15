import { Router } from 'express';
import deploymentRoutes from './deployment.routes';
import completionRoutes from './completion.routes';
import usageRoutes from './usage.routes';

const router = Router();


router.use('/', completionRoutes);
router.use('/deployments', deploymentRoutes);
router.use('/usage', usageRoutes);

export default router;