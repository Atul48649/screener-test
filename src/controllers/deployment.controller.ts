import { Request, Response } from 'express';
import * as deploymentService from '../services/deployment.service';

export const createDeployment = async (req: Request, res: Response) => {
    const { model } = req.body;
    const deployment = await deploymentService.createDeployment(model);
    return res.status(201).json({
        deployment_id: deployment.id,
        status: deployment.status
    });
};

export const getDeployment = async (req: Request, res: Response) => {
    const deployment = await deploymentService.getDeployment(req.params.id as string);
    if (!deployment) {
        return res.status(404).json({
            message: 'Deployment not found'
        });
    }
    return res.json(deployment);
};

export const terminateDeployment = async (req: Request, res: Response) => {
    const deployment = await deploymentService.terminateDeployment(req.params.id as string);
    return res.json({
        deployment_id: deployment.id,
        status: deployment.status
    });
};