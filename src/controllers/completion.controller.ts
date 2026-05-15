import { Request, Response } from 'express';
import { createCompletion } from '../services/completion.service';
import AppError from '../utils/app-error';

export const handleCompletion = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw AppError('Authorization header missing', 401);
    }

    const apiKey = authHeader.split(' ')[1];

    if (!apiKey) {
        throw AppError('Invalid authorization format', 401);
    }

    const { prompt } = req.body;

    if (!prompt) {
        throw AppError('Prompt is required', 400);
    }

    const response = await createCompletion(req.params.deployment_id as string, apiKey, prompt);

    return res.json({
        output: 'mocked response',
        input_tokens: response.input_tokens,
        output_tokens: response.output_tokens
    });
};