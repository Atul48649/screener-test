import dotenv from 'dotenv';
dotenv.config();

export const generateEndpointUrl = (deploymentId: string) => {
    return `http://localhost:${process.env.PORT}/api/v1/${deploymentId}/completions`;
};