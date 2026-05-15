import { Op } from 'sequelize';
import { UsageEvent } from '../models/usage-event.model';

export const getUsage = async (apiKey: string, from: string, to: string, groupBy: string) => {
    const fromDate = new Date(from);
    fromDate.setHours(0, 0, 0, 0);
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);
    const usageEvents = await UsageEvent.findAll({
        where: {
            apiKey,
            timestamp: {
                [Op.between]: [fromDate, toDate]
            }
        }
    });
    console.log("usageEvents", usageEvents);

    let totalInputTokens = 0;
    let totalOutputTokens = 0;

    const groupedData: Record<
        string,
        {
            inputTokens: number;
            outputTokens: number;
        }
    > = {};

    usageEvents.forEach((event: any) => {
        totalInputTokens += event.inputTokens;
        totalOutputTokens += event.outputTokens;

        const groupKey = groupBy === 'model' ? event.getDataValue('model') : new Date(event.getDataValue('timestamp'))
            .toISOString()
            .split('T')[0];

        if (!groupedData[groupKey]) {
            groupedData[groupKey] = {
                inputTokens: 0,
                outputTokens: 0
            };
        }

        groupedData[groupKey].inputTokens += event.inputTokens;
        groupedData[groupKey].outputTokens += event.outputTokens;
    });

    const breakdown = Object.entries(groupedData).map(([key, value]) => {
        const cost = (value.inputTokens / 1000) * 0.001 + (value.outputTokens / 1000) * 0.002;
        return {
            group: key,
            inputTokens: value.inputTokens,
            outputTokens: value.outputTokens,
            cost: Number(cost.toFixed(6))
        };
    });

    const totalCost = (totalInputTokens / 1000) * 0.001 + (totalOutputTokens / 1000) * 0.002;

    return {
        totalInputTokens,
        totalOutputTokens,
        totalCost: Number(
            totalCost.toFixed(6)
        ),
        breakdown
    };
};