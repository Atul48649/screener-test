import { Request, Response } from 'express';
import { getUsage } from '../services/usage.service';
import AppError from '../utils/app-error';

export const handleGetUsage = async (req: Request, res: Response) => {
    const { api_key, from, to, group_by } = req.query;

    if (!api_key) {
        throw AppError('api_key is required', 400);
    }

    if (!from) {
        throw AppError('from date is required', 400);
    }

    if (!to) {
        throw AppError('to date is required', 400);
    }

    const validGroupBy = ['day', 'model'];
    if (!validGroupBy.includes(group_by as string)) {
        throw AppError('group_by should be either day or model', 400);
    }

    const usageData = await getUsage(
        api_key as string,
        from as string,
        to as string,
        group_by as string
    );

    return res.json(
        usageData
    );
};