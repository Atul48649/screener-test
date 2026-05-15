import { Deployment, DeploymentStatus } from '../models/deployment.model';
import { generateApiKey } from '../utils/api-key';
import { generateEndpointUrl } from '../utils/endpoint';
import AppError from '../utils/app-error';

export const createDeployment = async (model: 'model-a' | 'model-b') => {
    const deployment = await Deployment.create({
        model,
        status: DeploymentStatus.PROVISIONING
    });

    setTimeout(async () => {
        await deployment.update({
            status: DeploymentStatus.READY,
            apiKey: generateApiKey(),
            endpointUrl: generateEndpointUrl(deployment.id)
        }, {
            where: {
                id: deployment.id
            }
        });
    }, 10000);
    return deployment;
};

export const getDeployment = async (id: string) => {
    return await Deployment.findByPk(id);
};

export const terminateDeployment = async (id: string) => {
    const deployment = await Deployment.findByPk(id);
    if (!deployment) {
        throw AppError('Deployment not found', 404);
    }

    await Deployment.update({
        status: DeploymentStatus.TERMINATED,
        terminatedAt: new Date()
    }, {
        where: {
            id: deployment.id
        }
    });

    return (await Deployment.findByPk(id))!;
};