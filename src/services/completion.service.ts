import { Deployment } from '../models/deployment.model';
import { UsageEvent } from '../models/usage-event.model';
import AppError from '../utils/app-error';
import { DeploymentStatus } from '../models/deployment.model';

export const createCompletion = async (deploymentId: string, apiKey: string, prompt: string) => {
    const deployment = await Deployment.findByPk(deploymentId);

    if (!deployment) {
        throw AppError('Deployment not found', 404);
    }

    if (deployment.status !== DeploymentStatus.READY) {
        throw AppError('Deployment is not ready', 409);
    }

    if (deployment.apiKey !== apiKey) {
        throw AppError('API key does not match the deployment', 403);
    }

    const inputTokens = Math.round(
        prompt.length / 4
    );

    const outputTokens = Math.floor(
        Math.random() * (200 - 50 + 1) + 50
    );

    await UsageEvent.create({
        apiKey,
        deploymentId,
        model: deployment.model,
        inputTokens,
        outputTokens,
        timestamp: new Date()
    });

    return {
        input_tokens: inputTokens,
        output_tokens: outputTokens
    };
};